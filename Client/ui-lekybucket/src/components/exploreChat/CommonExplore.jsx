import { ExploreChatStyleDiv } from './ExploreChatStyle';
import { Accordion, AccordionDetails, AccordionSummary, Badge } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';

const CommonExplore = (props) => {

  const {title, count, list} = props;
  const [isOpen, setIsOpen] = useState(true)

  const getProfileIcon = (name) => {
    const names = name.split(" ");

    let icon = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
      icon += names[names.length - 1].charAt(0).toUpperCase();
    }

    return icon;
  };

  const handleOnAccordianClick = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <ExploreChatStyleDiv>
      <Accordion
        expanded={isOpen}
        onChange={handleOnAccordianClick}
        className='accordian'
        sx={{
          boxShadow: 'none',
          '&:before': { display: 'none' }
        }}
      >
        <AccordionSummary>
          <header>
            { isOpen ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
            <h4> {title} </h4>
            <Badge badgeContent={ count } color="secondary" />
          </header>
        </AccordionSummary>

        <AccordionDetails>
          <section className="group-items">
            {
              list.map(item => (
                <div key={item.id} className='group-item'>
                    {
                      title === 'Groups' ? 
                      <span className='user-icon'><GroupsIcon className='group-icon'/></span> :
                      <span className='user-icon'> { getProfileIcon(item.name) } </span>
                    }
                    <span> {item.name} </span> 
                </div>
              ))
            }
          </section>
        </AccordionDetails>

      </Accordion>
    </ExploreChatStyleDiv>
  )
}

export default CommonExplore