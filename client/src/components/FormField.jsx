const FormField = ( { labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe } ) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <label
        htmlFor={ name }
        className="block text-sm font-medium text-gray-900"
      >
        { labelName }
      </label>

      { isSurpriseMe && (
        <button
          type="button"
          onClick={ handleSurpriseMe }
          className="px-2 py-1 font-semibold text-xs text-black bg-[#ececf1] rounded-[5px]"
        >
          Surprise Me
        </button>
      ) }
    </div>

    <input
      type={ type }
      id={ name }
      name={ name }
      placeholder={ placeholder }
      value={ value }
      onChange={ handleChange }
      className="block w-full p-3 text-gray-900 text-sm bg-gray-50 border border-gray-300 rounded-lg outline-none focus:ring-blue focus:border-blue"
      required
    />
  </div>
);

export default FormField;