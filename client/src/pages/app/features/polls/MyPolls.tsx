import { FetchPollsData, togglePollState, deletePoll } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { UI } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { Ellipsis } from 'lucide-react';

function MyPolls() {
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
  const context = useAuthContext();
  const navigate = useNavigate()

  useEffect(() => {
    FetchPollsData(setPageData, '/my_polls', context.state.user.userObj.id);
  },[])

  const [pageData, setPageData] = useState<Poll[]>([]);

  function formatDate (date: string) {
    //2024-08-01T08:23:54.000Z
    const formatedDate: string = date.split('').splice(0,10).join('');
    return formatedDate;
  }

  function getTotalVotes (votes: Record<string, number>){
    const totalVotes: number = Object.values(votes).reduce((acc, curr) => {
      acc = acc + curr;
      return acc;
    },0)
    return new Intl.NumberFormat().format(totalVotes) ;
  }

  async function handleTogglePollState (pollID: string, currentState: number){
    let newState: number;
    if (currentState == 0){
      newState = 1;
    }else{
      newState = 0;
    }
    await togglePollState(pollID, newState);
    navigate(0);
  }

  async function handleCopyPollUrl (urlToken: string){
    const pollURL = `${import.meta.env.VITE_CLIENT_BASE_URL}/polls/${urlToken}`;
    try {
      await navigator.clipboard.writeText(pollURL);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  async function handleDeletePoll (pollID: string) {
    await deletePoll(pollID);
    window.location.reload();
  }

  return (
    <div className="w-full flex flex-col justify-start items-center gap-5">
      <div className="w-full flex flex-row justify-between items-center ">
        <h1 className="text-4xl">{ new Intl.NumberFormat().format(pageData.length)} Poll{pageData.length !== 1 ? 's':''}</h1>
        <UI.Button className="rounded-full">
          <Link to="/dash/my_polls/new"> 
            Create New Poll
          </Link>
        </UI.Button>
      </div>
      <UI.Table>
        <UI.TableHeader>
          <UI.TableRow>
            <UI.TableHead>ID</UI.TableHead>
            <UI.TableHead>Question</UI.TableHead>
            <UI.TableHead>Created At</UI.TableHead>
            <UI.TableHead>Total Votes</UI.TableHead>
            <UI.TableHead>State</UI.TableHead>
            <UI.TableHead className="w-0"></UI.TableHead>
          </UI.TableRow>
        </UI.TableHeader>
        <UI.TableBody>
          {
            pageData.map((poll) => (
              <UI.TableRow key={poll.id}>
                  <UI.TableCell>{poll.id}</UI.TableCell>
                  <UI.TableCell>{poll.question}</UI.TableCell>
                  <UI.TableCell>{formatDate(poll.created_at)}</UI.TableCell>
                  <UI.TableCell>{getTotalVotes(poll.votes)}</UI.TableCell>
                  <UI.TableCell>
                    {
                      (poll.is_active === 0) ? (
                        <UI.Badge variant="destructive">Inactive</UI.Badge>
                      ):(
                        <UI.Badge variant="outline">Active</UI.Badge>
                      )
                    }
                  </UI.TableCell>
                  <UI.TableCell className="w-0">
                    <UI.DropdownMenu>
                      <UI.DropdownMenuTrigger className="p-1 rounded-md transition-all duration-300 ease-in-out hover:bg-slate-200">
                        <Ellipsis size={20}/>
                      </UI.DropdownMenuTrigger>
                      <UI.DropdownMenuContent>
                        <UI.DropdownMenuLabel>Actions</UI.DropdownMenuLabel>
                        <UI.DropdownMenuSeparator />
                        <UI.DropdownMenuItem asChild className="hover:cursor-pointer">
                          <Link to={`/dash/my_polls/${poll.id}`}>View details</Link>
                        </UI.DropdownMenuItem>
                        <UI.DropdownMenuItem className="hover:cursor-pointer" onClick={() => handleTogglePollState(poll.id, poll.is_active)}>
                          {poll.is_active === 0 ? 'Activate' : 'Deactivate'}
                        </UI.DropdownMenuItem>
                        <UI.DropdownMenuItem disabled={poll.is_active === 0} onClick={() => handleCopyPollUrl(poll.url_token)} className="hover:cursor-pointer">
                          Copy url
                        </UI.DropdownMenuItem>
                        <UI.DropdownMenuItem className="p-0 mt-1" disabled={poll.is_active === 1} onClick={() => handleDeletePoll(poll.id)}>
                          <span className="w-full h-full transition-all duration-300 ease-in-out hover:cursor-pointer bg-destructive/80 hover:bg-destructive px-2 py-1.5 rounded-sm text-primary-foreground">
                            Delete
                          </span>
                        </UI.DropdownMenuItem>
                      </UI.DropdownMenuContent>
                    </UI.DropdownMenu>
                  </UI.TableCell>
              </UI.TableRow>
            ))
          }
          
        </UI.TableBody>
      </UI.Table>
    </div>
  )
}

export default MyPolls