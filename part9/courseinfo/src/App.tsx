interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = ({ name }: { name: string }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />{part.description}
        </p>
      )
    case "group":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>projects exercises {part.groupProjectCount}
        </p>
      )
    case "background":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>{part.description}
          <br/>{part.backgroundMaterial}
        </p>
      )
    case "special":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>{part.description}
          <br/>Requirements: {part.requirements.join(", ")}
        </p>
      )
    default:
      assertNever(part);
  }
}

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return courseParts.map(part => { return (<Part key={part.name} part={part} />) })
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];
  const courseName = "Half Stack application development";
  
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts} />
      <Total total={totalExercises}/>
    </div>
  );
};

export default App;