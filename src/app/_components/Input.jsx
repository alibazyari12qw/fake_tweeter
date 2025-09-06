import React from "react";

const Input = ({ lable, placeHolder, className, value, setValue }) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm/6 font-medium text-gray-100"
      >
        {lable}
      </label>
      <div className="mt-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          placeholder={placeHolder}
          autoComplete="email"
          className={`max-sm:w-[100%] block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-white sm:text-sm/6 ${className}`}
        />
      </div>
    </div>
  );
};

export default Input;
