'use client';

import { Component as ComponentType } from '@/types';

interface GridCardProps {
  component: ComponentType;
  onClick: () => void;
}

const GridCard = ({ component, onClick }: GridCardProps) => {
  return (
    <div style={styles.card} onClick={onClick}>
      <img src={component.imageUrl} alt={component.title} style={styles.image} />
      <h3 style={styles.title}>{component.title}</h3>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  title: {
    marginTop: '10px',
    fontSize: '1rem',
  },
};

export default GridCard;
