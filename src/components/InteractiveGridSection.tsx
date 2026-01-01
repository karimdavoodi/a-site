'use client';

import { useState } from 'react';
import Modal from '@/components/Modal';
import { Component as ComponentType } from '@/types';
import Grid from './Grid';

export default function InteractiveGridSection() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const handleCardClick = (component: ComponentType) => {
    setModalContent(
      <div>
        <h2>{component.title}</h2>
        <p>{component.description}</p>
        <img src={component.imageUrl} alt={component.title} style={{ width: '100%' }} />
      </div>
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <>
      <Grid onCardClick={handleCardClick} />
      <Modal show={showModal} onClose={handleCloseModal} content={modalContent} />
    </>
  );
}
