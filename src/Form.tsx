// 0.1 The peer deps
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// 0.2 The main dep
import { createTsForm, useTsController } from '@ts-react/form';


// 1. Declare your schema
const schema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    age: z.number().min(10),
});

// 2. Create your component(s)
function TextField() {

    // The `useTsController()` hook allows you to build your components with the form state
    const { field, error } = useTsController<string>();
    return (
      <label>
        <span className="text-gray-700"></span>
        <input
            className="mt-1 block w-full"
            type={'text'}
            value={field.value}
            onChange={(e) => {
                field.onChange(e.target.value);
            }}
        />
        {error?.errorMessage && <small className=' text-red-700'>{error?.errorMessage}</small>}
      </label>
    );
  }

function NumberField() {
    const { field, error } = useTsController<number>();
    return (
        <label>
        <span className="text-gray-700"></span>
        <input
            className="mt-1 block w-full"
            type={'number'}
            value={field.value}
            onChange={(e) => {
                field.onChange(parseInt(e.target.value));
            }}
        />
        {error?.errorMessage && <small className=' text-red-700'>{error?.errorMessage}</small>}
        </label>
    );
}

// 3. Define your mapping - Tuple(Zod type, React Form Component)
const formStruct = [
    [ z.string(), TextField ],
    [ z.number(), NumberField ]
] as const

// 4. Create your Form
const TsForm = createTsForm(formStruct)

const Form = () => {
    // The schema resolutions magic
    useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
        console.log(data);
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {/* 5. Use the Form created (in step 4) */}
            {/* ...with the Zod schema created earlier (in step 1) */}
            {/* ...keep changing just the schema over the time */}
            {/* ...and see your forms magically adapting! */}
            <TsForm
                schema={schema}
                renderAfter={
                    () => <button
                            className="mt-1 block px-4 py-2 b-1 bg-violet-700 text-white" type="submit">
                                Submit
                            </button>}
                            onSubmit={onSubmit}
            />
            {/* Congratulations! You've got a winning form mgmt. strategy. */}

        </div>
    )
}

export default Form
