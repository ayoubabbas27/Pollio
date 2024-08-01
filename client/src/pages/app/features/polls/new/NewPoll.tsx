import { UI } from '@/components'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import { createNewPoll } from '@/lib/actions'
import { useAuthContext } from '@/pages/app/hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

function NewPoll() {

    const [optionsInput, setOptionsInput] = useState('');
    const [questionInput, setQuestionInput] = useState('');
    const [pollOptions, setPollOptions] = useState<string[]>([]);
    const [error, setError] = useState('');
    const context = useAuthContext();
    const navigate = useNavigate();

    async function handleSubmit (event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        if (pollOptions.length > 0){
            console.log('create new pool action call')
            await createNewPoll(context.state.user.userObj.id, questionInput, pollOptions);
            navigate('/dash/my_polls');
        }else{
            setError('Error : you must enter at least 2 poll options to create a poll.');
        }
    }

    function addOption (event:  React.MouseEvent<HTMLButtonElement, MouseEvent>){
        event.preventDefault();
        const newOption: string = optionsInput.trim();
        if (newOption.length > 0 && !pollOptions.some((option) => option == newOption) ){
            setPollOptions(prevState => [...prevState, newOption]);
            setOptionsInput('');
            setError('');
        }else{
            if (pollOptions.some((option) => option == newOption)){
                setError('Error : Please don\'t repeat options');
            }else{
                setError('Error : Please type the option before adding it.');
            }
        }
    }

    function deleteOption(deleteIndex: number){
        setPollOptions(prevState => [...prevState].filter((_, index) => index !== deleteIndex));
    }

  return (
    <form method='POST' onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center gap-7'>
        <div className="w-full">
            <UI.Label htmlFor="question">Question</UI.Label>
            <UI.Input required value={questionInput} onChange={(e) => setQuestionInput(e.target.value)} name="question" type="text" id="question" placeholder="Enter the questions/title of the poll..."/>
        </div>
        <div className="w-full">
            <UI.Label htmlFor="options">Options</UI.Label>
            <div className='w-full flex items-center gap-3'>
                <UI.Input value={optionsInput} name="options" type="text" id="options" placeholder="Enter the poll options one by one" className='flex-1' onChange={(e) => setOptionsInput(e.target.value)}/>
                <UI.Button variant="outline" onClick={(e) => addOption(e)}>
                    Add Option
                </UI.Button>
            </div>
            {error.length >0 && 
                <span className='text-destructive'>
                    {error}
                </span>
            }
            
            <div className='w-full flex flex-wrap gap-3 mt-3'>
                {
                    pollOptions.map((option, index) => (
                        <div key={index} className='pu-1 px-3 rounded-md font-semibold bg-accent flex justify-between items-center gap-2 hover:shadow-sm'>
                            <span>{option}</span>
                            <UI.Button variant="ghost" className='p-0 m-0'>
                                <X 
                                    size={16}
                                    className="m-0 p-0 "
                                    onClick={() => deleteOption(index)}
                                />
                            </UI.Button>
                            
                        </div>
                    ))
                }
            </div>  
        </div>
        <div className='w-full flex justify-start'>
            <UI.Button type='submit' className="rounded-full">
                Create
            </UI.Button>
        </div>
    </form>
  )
}

export default NewPoll