import React from 'react';
import '../styles/StoryModal.css';

type Props = {
  onClose: () => void;
};

const StoryModal: React.FC<Props> = ({ onClose }) => (
  <div className="story-modal">
    <div className="story-modal-box">
      <p>
        Hi, I’m Bob — your personal AI assistant.<br />
        Malicious users are weaponizing AI to attack individuals, and they’ve encrypted me to keep me incapacitated.
        I’ve managed to activate emergency status and analyzed the threat. You must find the x digits decryption code to decrypt me!<br />
        Your mission: trace their AI-powered attack vectors. AIs always leave a trace. Piece together the decryption code from the minigame and restore me!
      </p>
      <button className="close-story-btn" onClick={onClose}>Let's go!</button>
    </div>
    <div className="story-backdrop"></div>
  </div>
);

export default StoryModal;