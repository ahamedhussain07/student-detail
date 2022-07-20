const SelectOption = ({ name, values, placeholder,onChange }) => {
    return (
      <>
        <select name={name} onChange={onChange}>
          <option   value="DEFAULT">
            {placeholder}
          </option>
          {values.map((val, ind) => (
            <option key={ind} value={val} >
              {val}
            </option>
          ))}
        </select>
      </>
    );
  };

  export default SelectOption