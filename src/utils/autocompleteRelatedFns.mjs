  const onAddition = (tag, props, setProps) => {
    // get the form info that is currently saved in user's local storage
    let newProps = {...props};
    newProps.tags = [...newProps.tags, tag];
    setProps(newProps);
  };

  const onDelete = (i, props, setProps) => {
    let newProps = {...props};
    newProps.tags = newProps.tags.slice(0);
    newProps.tags.splice(i, 1);
    setProps(newProps);
  };

  export {onAddition, onDelete}