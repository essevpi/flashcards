import styles from './ContextualMenu.styles';

const ContextualMenu = ({ children, icon, isOpen }) => {
  return (
    <div className='relative'>
      <div className='relative text-xl'>{icon}</div>
      {isOpen && (
        <div className='flex flex-col gap-2 absolute top-6 right-0 z-50 p-4 rounded-md bg-neutral-700'>
          {children}
        </div>
      )}
    </div>
  );
};

const Action = ({ action, icon, onClick }) => {
  return (
    <span className={styles.contextualMenuAction} onClick={onClick}>
      {action}{icon}
    </span>
  );
};

ContextualMenu.Action = Action;

export default ContextualMenu;
