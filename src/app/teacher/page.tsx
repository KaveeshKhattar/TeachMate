import Students from "../_components/Students";

interface TeacherProps {
  clerkUserId: string;
}

const Teacher: React.FC<TeacherProps> = ({ clerkUserId }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full m-4">
        <Students clerkUserId={clerkUserId}/>
      </div>
    </>
  );
}

export default Teacher;