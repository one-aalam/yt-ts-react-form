import { createTsForm, useTsController } from '@ts-react/form';
import { useForm } from "react-hook-form";

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    age: z.number().min(10),
});

function TextField() {
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

  const formStruct = [
    [ z.string(), TextField ],
    [ z.number(), NumberField ]
  ] as const

  const TsForm = createTsForm(formStruct)

const Form = () => {
    useForm({
        resolver: zodResolver(schema)
    });
    const onSubmit = (data: z.infer<typeof schema>) => console.log(data);

    return (
        <div className="grid grid-cols-1 gap-6">
            <TsForm schema={schema} renderAfter={() => <button
                className="mt-1 block px-4 py-2 b-1 bg-violet-700 text-white" type="submit">Submit</button>} onSubmit={onSubmit}/>
        </div>
    )
}

export default Form
