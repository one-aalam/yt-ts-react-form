import { createTsForm, useTsController } from '@ts-react/form';
import React from 'react'
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
      <>
        <input
          value={field.value}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
        />
        {error?.errorMessage && <span>{error?.errorMessage}</span>}
      </>
    );
  }

  function NumberField() {
    const { field, error } = useTsController<number>();
    return (
      <>
        <input
          value={field.value}
          onChange={(e) => {
            field.onChange(parseInt(e.target.value));
          }}
        />
        {error?.errorMessage && <span>{error?.errorMessage}</span>}
      </>
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
        <TsForm schema={schema} renderAfter={() => <button type="submit">Submit</button>} onSubmit={onSubmit}/>
    )
}

export default Form
