import React from 'react';
import {Accordion, AccordionSummary, Typography, AccordionDetails,
  makeStyles, Chip
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
    width: '60%',
    "@media (max-width: 540px)": {
      width: '80%'
    },
    "@media (max-width: 414px)": {
      width: '90%'
    }
  },
  accordion: {
    width: '100%'
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    "@media (max-width: 540px)": {
      fontSize: '12px',
      fontWeight: '400'
    }
  },
  chip: {
    margin: '5px'
  }
}))

export default function MovePokemon({data}) {
  const classes = useStyles();

  return (
    <div className={`row-center ${classes.root}`}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h3" className={classes.title}>Moves</Typography>
        </AccordionSummary>
        <AccordionDetails className={'row-center'}>
          {data?.map((value, index) => {
            return (
              <Chip 
                label={value.move.name} 
                key={index} 
                color="primary" 
                variant="outlined" 
                className={classes.chip} 
              />
            )
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}