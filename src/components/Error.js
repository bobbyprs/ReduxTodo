import React, { useEffect } from "react";

const Error = (props) => {
  useEffect(() => {
    props.handleError(true);
  }, []);
  return (
    <div>
      <h1 className="error">Oops ! Page not Found.</h1>
    </div>
  );
};
export default Error;
