import globalStyles from '../../styles/globals';

const EditForm = ({ value, onChange, onSubmit }) => {
  return (
    <form className={globalStyles.addForm} onSubmit={onSubmit}>
      <input
        className={globalStyles.inputField}
        value={value}
        onChange={onChange}
      />
      <p>New Title: {value}</p>
      <button className={globalStyles.button}>Confirm</button>
    </form>
  );
};

export default EditForm;
