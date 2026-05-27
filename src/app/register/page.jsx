import RegisterUser from '@/Component/Register';

export const metadata = {
  title: 'Registration - ThinkShare',
  description: 'This is the best idea share platform '
}

const page = () => {
  return (
    <div>
      <RegisterUser/>
    </div>
  );
};

export default page;