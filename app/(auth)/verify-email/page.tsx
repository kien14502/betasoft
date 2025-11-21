import VerifyEmailForm from '../components/VerifyEmailForm';

type Props = {
  searchParams: { email: string };
};

const VerifyEmail = async ({ searchParams }: Props) => {
  const { email } = await searchParams;
  return <VerifyEmailForm email={email} />;
};
export default VerifyEmail;
