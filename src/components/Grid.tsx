import { Component as ComponentType } from '@/types';
import GridCard from './GridCard';
import styles from './Grid.module.css';
import componentsData from '../../public/data/components.json';

const Grid = ({ onCardClick }: { onCardClick: (component: ComponentType) => void }) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        {componentsData.map((component) => (
          <GridCard key={component.id} component={component} onClick={() => onCardClick(component)} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
