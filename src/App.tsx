import Form from './Form'

function App() {
  return (
    <div className="antialiased text-gray-900 px-6">
        <h1 className="text-3xl font-bold underline">
            React TS Form
        </h1>
        <p className='my-2'>
        @ts-react/form handles the boilerplate involved when building forms using zod and react-hook-form without sacrificing customizability.
        </p>
      <Form/>
    </div>
  );
}

export default App;
