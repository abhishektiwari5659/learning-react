const Error = ({ err }) => {
  return (
    <div>
      <p>
        Oops, an error {err?.message || err || "occurred"}.
      </p>
    </div>
  );
};

export default Error;
