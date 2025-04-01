import bcrypt from "bcrypt";

const passwordEncryption = async (
  password: string
): Promise<string | undefined> => {
  if (!password) return undefined;

  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export default passwordEncryption;
