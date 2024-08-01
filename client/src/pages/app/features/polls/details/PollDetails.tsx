import { UI } from '@/components';
import { fetchPoll } from '@/lib/actions';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function PollDetails() {
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

    const { pollId } = useParams();
    const [poll, setPoll] = useState<Poll | undefined>(undefined);

    function formatDate(date?: string): string {
        if (!date) return '';
        return date.split('').splice(0, 10).join('');
    }
    
    
    function getTotalVotes(votes?: Record<string, number>): number {
        if (!votes) return 0;
        return Object.values(votes).reduce((acc, curr) => acc + curr, 0);
    }
    

    useEffect(() => {
        console.log(pollId);
        if (pollId) {
            fetchPoll(pollId, setPoll);
        }
    }, [pollId]);

  return (
    <>
        <UI.Button variant="ghost" asChild className='py-1 px-2 rounded-full'>
            <Link to="/dash/my_polls" className='p-0 m-0'>
                <ArrowLeft size={22}/>
            </Link>
        </UI.Button>
        
        <div className='w-full h-full flex flex-col justify-start items-start gap-5 mt-5'>
            
            <div className="flex flex-row justify-center items-center gap-3">
                <span className='font-semibold'>State : </span>
                {
                    (poll?.is_active === 0) ? (
                    <UI.Badge variant="destructive">Inactive</UI.Badge>
                    ):(
                    <UI.Badge variant="outline">Active</UI.Badge>
                    )
                }
            </div>
            <div className="flex flex-row justify-center items-center gap-3">
                <span className='font-semibold'> 
                    ID : <span className='font-normal text-muted-foreground'>{poll?.id ?? 'N/A'}</span>
                </span>
            </div>
            <div className="flex flex-row justify-center items-center gap-3">
                <span className='font-semibold'>
                    Question : <span className='font-normal text-muted-foreground'>{poll?.question ?? 'N/A'}</span>
                </span>
            </div>
            <div className="flex flex-row justify-center items-center gap-3">
                <span className='font-semibold'>
                    Total votes : <span className=' font-normal text-muted-foreground'>{getTotalVotes(poll?.votes as Record<string, number>) ?? 'N/A'}</span>
                </span>
            </div>
            <div className="flex flex-row justify-center items-center gap-3">
                <span className='font-semibold'> 
                    Created At : <span className='font-normal text-muted-foreground'>{formatDate(poll?.created_at as string) ?? 'N/A'}</span>
                </span>
            </div>
            <div className="flex flex-row justify-center items-center gap-3">
                <span className='font-semibold'> 
                    URL : <span className='font-normal text-muted-foreground'>{`${import.meta.env.VITE_CLIENT_BASE_URL}/polls/${poll?.url_token}`}</span>
                </span>
            </div>

            <div className='w-full flex justify-center'>
                <h1 className='font-bold text-2xl'>Poll Results</h1>
            </div>

            <div className='w-full flex flex-row justify-center items-center gap-5 flex-wrap'>
                    {poll?.votes ? (
                        Object.entries(poll.votes).map(([key, value], index) => (
                            <div key={index} className='flex flex-col justify-center items-center gap-3 border-2 border-slate-200 rounded-md p-3 min-w-52 aspect-square'>
                                <span className='text-lg font-semibold text-primary'>{key}</span>
                                <span className='text-muted-foreground text-wrap'>{new Intl.NumberFormat().format(value)} votes</span>
                            </div>
                        ))
                    ) : (
                        <span>No votes available</span>
                    )}
            </div>

        </div>
    </>
  )
}

export default PollDetails