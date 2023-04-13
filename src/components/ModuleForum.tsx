import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_URL, Colors } from "../constants";
import { Module, ModuleInitialState } from "../redux/features/modules/moduleSlice";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { DUMMY_USERID, DUMMY_TOKEN } from "../redux/state";

export const RedButton = styled.div`
    font-family: 'Poppins', 'sans-serif';
    color: ${Colors.white};
    background-color: ${Colors.red};
    width: inherit;
    border-radius: 20px;
    font-weight: 700;
    font-size: 1em;
    padding: 8px 0px;
    display: grid;
    place-items: center;
    cursor: pointer;
`

const ForumBackground = styled.div`
    border-radius: 20px;
    width: 17.5vw;
    max-width: 17.5vw;
    padding: 1.5em;
    border: none;
    border-radius: 20px;
    background-color: ${Colors.yellow};
    color: ${Colors.white};
    font-family: 'Poppins', 'sans-serif';
`

const Top = styled.div`
    height: 50%;
    vertical-align: top;
`

const Bottom = styled.div`
    display: grid;
    margin-top: 3em;
    height: 50%;
    vertical-align: bottom;
    align-content: end;
    gap: 8px;
`

const ForumHeading = styled.div`
    color: ${Colors.white};
    font-weight: 700;
    font-size: 1.8em;
    text-decoration: underline;
`

const ForumDesc = styled.span`
    display: inline;
    whitespace: nowrap;
    color: ${Colors.white};
    font-weight: 500;
    font-size: 1em;
`

const RedLink = styled.a`
    width: 20px;
    color: ${Colors.red};
    font-weight: 500;
    font-size: 1em;
    text-decoration: underline;
`

const SubscriberDiv = styled.div`
    display: flex;
`

const SubscriberDesc = styled.a`
    color: ${Colors.white};
    font-weight: 500;
    font-size: 1em;
    text-decoration: underline;
    margin-left: 0.5em;
`

const ModuleForum = ({ selectedModule } : { selectedModule : string }) => {
    const [module, setModule] = useState<Module>(ModuleInitialState);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

    const fetchMod = () => {
        fetch(API_URL + `/module/${selectedModule.toUpperCase()}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setModule(data.module);
            })
            .catch(error => console.log(error))
    }

    const fetchIsSubscribed = () => {
        fetch(API_URL + `/subscribes/${selectedModule.toUpperCase()}/${DUMMY_USERID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setIsSubscribed(data.subscribed);
            })
            .catch(error => console.log(error))
    }

    const handleButtonClick = () => {
        if (!isSubscribed) {
            fetch(API_URL + `/subscribes/${selectedModule.toUpperCase()}/${DUMMY_USERID}`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${DUMMY_TOKEN}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setIsSubscribed(true);
            })
            .catch(error => console.log(error))
        } else {
            fetch(API_URL + `/subscribes/${selectedModule.toUpperCase()}/${DUMMY_USERID}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${DUMMY_TOKEN}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setIsSubscribed(false);
            })
            .catch(error => console.log(error))
        }

    }
    
    useEffect(() => {
        fetchMod();
        fetchIsSubscribed();
    }, [module, isSubscribed]);

    return (
        <div>
            <ForumBackground>
                <Top>
                    <ForumHeading>
                        {module.Id} Forum
                    </ForumHeading>
                    <div>
                        <ForumDesc>
                            {module.Name}
                        </ForumDesc>
                    </div>
                    <div>
                        <ForumDesc>
                            {`Link to `}
                            <RedLink href="">
                                resources archive
                            </RedLink>
                        </ForumDesc>
                    </div>
                </Top>
                <Bottom>
                    <SubscriberDiv>
                        <PeopleAltIcon/>
                        <SubscriberDesc href={`/subscribers/${selectedModule}`}>
                            {module.SubscriberCount} subscribers
                        </SubscriberDesc>
                    </SubscriberDiv>
                    <RedButton onClick={handleButtonClick}>
                        {isSubscribed ? (
                            <p>Unsubscribe</p>
                        ) : (
                            <p>Subscribe</p>
                        )
                        }
                    </RedButton>
                </Bottom>
            </ForumBackground>
        </div>
    );
}

export default ModuleForum;