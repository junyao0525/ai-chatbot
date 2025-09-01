export const InputFieldProps = {
  placeholder: "Search",
};

export const InputField = {(placeholder): InputFieldProps} => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};
