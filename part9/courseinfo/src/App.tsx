const Header = ({ name }: { name: string }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Content = (props: ContentProps) => {
  return (
    <>
      <p>
        {props.name} {props.exerciseCount}
      </p>
    </>
  )
}

const Total = ({total}: {total: number}) => {
  return (
    <>
      <p>
        Number of exercises {total}
      </p>
    </>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName}/>
      {courseParts.map((part) => <Content key={part.name} name={part.name} exerciseCount={part.exerciseCount} />)}
      <Total total={totalExercises}/>
    </div>
  );
};

export default App;