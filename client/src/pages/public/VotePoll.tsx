import { UI } from '@/components';
import { fetchVotePoll, vote } from '@/lib/actions';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function VotePoll() {

    interface Poll {
        id: string;
        question: string;
        options: string[];
        votes: Record<string, number>;
        url_token: string;
        creator_id: string;
        created_at: string;
        is_active: number;
      }

    const { urlToken } = useParams();
    const [poll, setPoll] = useState<Poll | undefined>(undefined);
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(urlToken);
        if (urlToken) {
            fetchVotePoll(urlToken, setPoll);
        }
    }, [urlToken]);

    async function handleVote(){
        await vote(urlToken as string, selectedOption);
        navigate(`/polls/${urlToken}/thankyou`);
    }


  return (
    <>
        {
            poll?.is_active === 1 ? (
                <div className='w-full h-full flex flex-col justify-center items-center gap-7 my-5 px-4'>
                    <Link className="font-bold text-2xl" to="/">
                        Poll<span className="text-[#16AF8E]">io</span>
                    </Link>
                    <h1 className='text-2xl font-bold text-center'>{poll?.question ?? 'N/A'}</h1>
                    <div className='flex flex-row flex-wrap justify-center items-center gap-4'>
                        {poll?.options ? (
                            poll.options.map((option, index) => (
                                <div key={index} className={`flex flex-col justify-center items-center gap-3 border-2 rounded-md p-3 min-w-52 aspect-square ${(option === selectedOption) ? 'border-primary shadow-md' : 'border-slate-200 '}`}>
                                    <span className='text-lg font-semibold text-primary'>{option}</span>
                                    <UI.Button variant="outline" onClick={() => setSelectedOption(option)} disabled={option === selectedOption}>
                                        Select
                                    </UI.Button>
                                </div>
                            ))
                        ) : (
                            <span>No Options available</span>
                        )}
                    </div>
                    
                    <div className="w-full flex justify-center">
                        <UI.Button className="rounded-full flex gap-2" onClick={() => handleVote()} disabled={selectedOption === ''}>
                            Send Vote <ArrowRight size={17}/>
                        </UI.Button>
                    </div>
                </div>
            ):(
                <div className='w-full h-[100vh] flex flex-col justify-center items-center px-5'>
        <div className='py-4 px-6 border-2 border-slate-200 flex flex-col justify-center items-center gap-5 shadow-sm mt-5 rounded-md max-w-[600px]'>
            <Link className="font-bold text-2xl" to="/">
                Poll<span className="text-[#16AF8E]">io</span>
            </Link>

            <span className='text-2xl text-center font-semibold mt-2 text-destructive'>This poll is no longer available !</span>

            <span className='text-muted-foreground text-wrap text-center mt-5'>
                <Link to="/sign_up" className="underline text-primary font-semibold mr-1">Sign Up</Link>
                to Pollio now and create the polls that will make your data gathering and decision making easier.
            </span>

        </div>
    </div>
            )
        }
        
    </>
  )
}

export default VotePoll