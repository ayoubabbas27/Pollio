import { FetchPollsData } from "@/lib/actions";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { UI } from "@/components";
import { Link } from "react-router-dom";
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
  const context = useAuthContext()

  useEffect(() => {
    FetchPollsData(setPageData, '/my_polls', context.state.user.userObj.id);
    console.log(pageData);
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
    return totalVotes;
  }

  function handleTogglePollState (pollID: string){

  }

  function handleCopyPollUrl (urlToken: string){

  }

  return (
    <div className="w-full flex flex-col justify-start items-center gap-5">
      <div className="w-full flex flex-row justify-between items-center ">
        <h1 className="text-4xl">{pageData.length} Poll{pageData.length !== 1 ? 's':''}</h1>
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
                        <UI.DropdownMenuItem className="hover:cursor-pointer" onClick={() => handleTogglePollState(poll.id)}>
                          {poll.is_active === 0 ? 'Activate' : 'Deactivate'}
                        </UI.DropdownMenuItem>
                        <UI.DropdownMenuItem disabled={poll.is_active === 0} onClick={() => handleCopyPollUrl(poll.url_token)}>
                          Copy url
                        </UI.DropdownMenuItem>
                        <UI.DropdownMenuItem className="hover:cursor-pointer bg-red-200 transition-all duration-300 ease-in-out hover:bg-destructive hover:text-primary-foreground">
                          Delete
                        </UI.DropdownMenuItem>
                      </UI.DropdownMenuContent>
                    </UI.DropdownMenu>
                  </UI.TableCell>
              </UI.TableRow>
            ))
          }
          
        </UI.TableBody>
      </UI.Table>

      <div>
        {
          Object.entries(pageData).map((poll) => (
            <span></span>
          ))
        }
      </div>
    </div>
  )
}

export default MyPolls