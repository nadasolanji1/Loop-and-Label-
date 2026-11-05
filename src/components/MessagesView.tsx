/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  MapPin,
  Clock,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MessagesView: React.FC = () => {
  const {
    conversations,
    messages,
    activeConversationId,
    openConversation,
    sendMessage,
    activeCampus,
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [meetupSpot, setMeetupSpot] = useState(activeCampus.safeMeetupSpots[0]);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];
  const activeMessages = activeConv ? messages[activeConv.id] || [] : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConv) return;
    sendMessage(activeConv.id, messageInput.trim());
    setMessageInput('');
  };

  const handleProposeMeetup = () => {
    if (!activeConv) return;
    sendMessage(
      activeConv.id,
      `I propose meeting at ${meetupSpot} on campus to inspect and exchange the item!`,
      meetupSpot,
      'Tomorrow between classes'
    );
    setShowLocationPicker(false);
  };

  return (
    <div className="bg-[#F7F3ED] min-h-[calc(100vh-130px)] py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFCF8] rounded-sm border border-[#B3A49A]/40 shadow-sm overflow-hidden flex flex-col md:flex-row h-[750px]">
          {/* Left Column: Conversations List */}
          <div className="md:w-80 border-r border-[#B3A49A]/30 flex flex-col bg-[#F7F3ED]/40">
            <div className="p-4 border-b border-[#B3A49A]/30">
              <h2 className="font-editorial text-2xl text-[#252525]">
                Campus Messages
              </h2>
              <span className="text-[11px] text-[#252525]/60 mt-0.5 block">
                Direct buyer & seller exchange chat
              </span>
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-[#B3A49A]/20">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => openConversation(conv.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    activeConv?.id === conv.id
                      ? 'bg-[#EADDDC]/60'
                      : 'hover:bg-[#FFFCF8]'
                  }`}
                >
                  <img
                    src={conv.participantAvatar}
                    alt={conv.participantName}
                    className="w-10 h-10 rounded-full border border-[#B3A49A]/30 object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#252525] truncate">
                        {conv.participantName}
                      </span>
                      <span className="text-[10px] text-[#252525]/50">
                        {conv.lastTimestamp}
                      </span>
                    </div>

                    {conv.itemTitle && (
                      <span className="text-[11px] text-[#743C4A] font-medium truncate block">
                        Re: {conv.itemTitle}
                      </span>
                    )}

                    <p className="text-xs text-[#252525]/70 truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Chat Window */}
          {activeConv ? (
            <div className="flex-1 flex flex-col justify-between bg-[#FFFCF8]">
              {/* Chat Header */}
              <div className="p-4 border-b border-[#B3A49A]/30 flex items-center justify-between bg-[#FFFCF8]">
                <div className="flex items-center gap-3">
                  <img
                    src={activeConv.participantAvatar}
                    alt={activeConv.participantName}
                    className="w-10 h-10 rounded-full border border-[#B3A49A]/30 object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-[#252525]">
                      {activeConv.participantName}
                    </h3>
                    <span className="text-[11px] text-[#252525]/60 block">
                      {activeConv.participantUniversity}
                    </span>
                  </div>
                </div>

                {/* Item Thumbnail Chip */}
                {activeConv.itemTitle && (
                  <div className="hidden sm:flex items-center gap-2 p-1.5 bg-[#F7F3ED] rounded-xs border border-[#B3A49A]/30 text-xs">
                    {activeConv.itemImage && (
                      <img
                        src={activeConv.itemImage}
                        alt="item"
                        className="w-8 h-8 rounded-xs object-cover"
                      />
                    )}
                    <div className="max-w-[150px] truncate">
                      <span className="block truncate font-medium text-[11px]">
                        {activeConv.itemTitle}
                      </span>
                      <span className="font-mono text-[#743C4A] font-bold">
                        ${activeConv.itemPrice}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Messages Log */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
                {activeMessages.map((msg) => {
                  const isMe = msg.senderId === 'user-maya';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-3.5 rounded-sm text-xs leading-relaxed ${
                          isMe
                            ? 'bg-[#743C4A] text-[#FFFCF8]'
                            : 'bg-[#F7F3ED] text-[#252525] border border-[#B3A49A]/30'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Proposed Meetup Card if included in message */}
                        {msg.proposedMeetupLocation && (
                          <div
                            className={`mt-2.5 p-2 rounded-xs border flex items-center gap-2 text-[11px] ${
                              isMe
                                ? 'bg-black/20 border-white/20 text-[#FFFCF8]'
                                : 'bg-[#FFFCF8] border-[#743C4A]/40 text-[#743C4A]'
                            }`}
                          >
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              Safety Spot: <strong>{msg.proposedMeetupLocation}</strong>
                            </span>
                          </div>
                        )}
                      </div>

                      <span className="text-[10px] text-[#252525]/50 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input & Meetup Proposal Bar */}
              <div className="p-3 sm:p-4 border-t border-[#B3A49A]/30 bg-[#F7F3ED]/40 space-y-2">
                {showLocationPicker && (
                  <div className="p-3 bg-[#FFFCF8] rounded-xs border border-[#743C4A]/40 text-xs space-y-2">
                    <span className="text-[11px] font-semibold uppercase text-[#743C4A] block">
                      Propose Safe Campus Meetup Spot:
                    </span>
                    <select
                      value={meetupSpot}
                      onChange={(e) => setMeetupSpot(e.target.value)}
                      className="w-full bg-[#F7F3ED] border border-[#B3A49A]/40 p-2 rounded-xs focus:outline-none"
                    >
                      {activeCampus.safeMeetupSpots.map((spot, i) => (
                        <option key={i} value={spot}>
                          {spot}
                        </option>
                      ))}
                    </select>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowLocationPicker(false)}
                        className="px-2.5 py-1 text-xs text-[#252525]/60"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleProposeMeetup}
                        className="px-3 py-1 bg-[#743C4A] text-white text-xs rounded-xs"
                      >
                        Send Proposed Location
                      </button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLocationPicker(!showLocationPicker)}
                    className="p-2.5 bg-[#FFFCF8] border border-[#B3A49A]/40 text-[#743C4A] rounded-xs hover:bg-[#EADDDC]/50 cursor-pointer"
                    title="Propose safe campus meetup location"
                  >
                    <MapPin className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    placeholder="Type a message or agree on a campus exchange time..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 bg-[#FFFCF8] border border-[#B3A49A]/40 text-xs py-2.5 px-3 rounded-xs focus:border-[#743C4A] focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="p-2.5 bg-[#743C4A] text-[#FFFCF8] rounded-xs hover:bg-[#5E303B] transition-colors cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-[#252525]/60 text-xs">
              Select a conversation to start chatting with campus sellers.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
