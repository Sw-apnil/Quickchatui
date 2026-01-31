import React, { useContext, useEffect, useRef, useState } from 'react'
import assets from '../assets/assets'
import { formatMessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext)
  const { authUser, onlineUsers } = useContext(AuthContext)

  const [input, setInput] = useState('')
  const scrollEnd = useRef(null)

  // 🔴 ADDED: track whether user is near bottom
  const isUserAtBottomRef = useRef(true)

  // send text message
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!selectedUser || input.trim() === '') return

    await sendMessage({ text: input.trim() })
    setInput('')
  }

  // send image
  const handleSendImage = (e) => {
    if (!selectedUser) return

    const file = e.target.files[0]
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Select a valid image file')
      return
    }

    const reader = new FileReader()
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result })
      e.target.value = ''
    }
    reader.readAsDataURL(file)
  }

  // fetch messages when user changes
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser, getMessages])

  // 🔴 CHANGED: auto-scroll only if user is at bottom
  useEffect(() => {
    if (isUserAtBottomRef.current) {
      scrollEnd.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-8 rounded-full"
        />

        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500" />
          )}
        </p>

        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />

        <img
          src={assets.help_icon}
          alt=""
          className="max-md:hidden max-w-5 cursor-pointer"
        />
      </div>

      {/* Chat area */}
      <div
        // 🔴 ADDED: track manual scrolling
        onScroll={(e) => {
          const el = e.target
          isUserAtBottomRef.current =
            el.scrollHeight - el.scrollTop - el.clientHeight < 100
        }}
        className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6"
      >
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex items-end gap-2 justify-end ${
              msg.senderId !== authUser._id && 'flex-row-reverse'
            }`}
          >
            {msg.image ? (
              <img
                src={msg.image}
                alt=""
                className="max-w-[230px] border border-gray-700 rounded-lg mb-8"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                  msg.senderId === authUser._id
                    ? 'rounded-br-none'
                    : 'rounded-bl-none'
                }`}
              >
                {msg.text}
              </p>
            )}

            <div className="text-center text-xs">
              <img
                src={
                  msg.senderId === authUser._id
                    ? authUser?.profilePic || assets.avatar_icon
                    : selectedUser?.profilePic || assets.avatar_icon
                }
                alt=""
                className="w-7 rounded-full"
              />
              <p className="text-gray-500">
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}

        <div ref={scrollEnd} />
      </div>

      {/* Bottom input */}
      <form
        onSubmit={handleSendMessage}
        className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3"
      >
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none outline-none text-white placeholder-gray-400 bg-transparent"
          />

          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />

          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>

        <button type="submit">
          <img src={assets.send_button} alt="" className="w-7" />
        </button>
      </form>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} className="max-w-16" alt="" />
      <p className="text-lg font-medium text-white">
        Chat anytime, anywhere
      </p>
    </div>
  )
}

export default ChatContainer
