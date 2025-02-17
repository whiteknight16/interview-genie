const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-full w-full p-6 mt-5">
      {children}
    </div>
  );
};

export default AuthLayout;
