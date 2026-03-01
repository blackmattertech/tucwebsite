interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
}

export function FormInput({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  required = false,
  textarea = false,
  rows = 4
}: FormInputProps) {
  const inputClasses = "w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors";
  
  return (
    <div>
      <label htmlFor={name} className="block text-gray-900 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
          style={{ fontSize: '15px' }}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          className={inputClasses}
          style={{ fontSize: '15px' }}
        />
      )}
    </div>
  );
}
