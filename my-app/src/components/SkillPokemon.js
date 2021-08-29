import React from 'react';
import {Accordion, AccordionSummary, Typography, AccordionDetails,
  makeStyles, Box, LinearProgress
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
  nameSkill: {
    width: '15%'
  },
  progressSkill: {
    width: '75%',
    "@media (max-width: 350px)": {
      width: '60%'
    }
  },
  numSkill: {
    width: '5%'
  },
  box: {
    marginBottom: '10px'
  },
  lowStat: {
    color: '#919191'
  },
  mediumStat: {
    color: 'black'
  },
  highStat: {
    color: '#004bb5',
    fontWeight: '600'
  }
}))

export default function SkillPokemon({data}) {
  const classes = useStyles();

  return (
    <div className={`row-center ${classes.root}`}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h3" className={classes.title}>Skills</Typography>
        </AccordionSummary>
        <AccordionDetails className={'column-center'}>
          {data?.map((value, index) => {
            return (
              <Box 
                className={`row-between ${classes.box}`} 
                width="100%" 
                key={index}
              >
                <Box className={classes.nameSkill}>
                  <Typography align="right" variant="body2">
                    {value.stat.name}
                  </Typography>
                </Box>
                <Box className={classes.progressSkill}>
                  <LinearProgress 
                    variant="determinate" 
                    value={value.base_stat > 100 ? 100 : value.base_stat} 
                  />
                </Box>
                <Box className={classes.numSkill}>
                  <Typography 
                    align="left" 
                    variant="body2" 
                    className={
                      Number(value.base_stat) < 75 ? 
                      classes.lowStat : 
                      (
                        Number(value.base_stat) < 100 ? 
                        classes.mediumStat : 
                        classes.highStat
                      )
                    }>
                      {value.base_stat}
                    </Typography>
                </Box>
              </Box>
            )
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}