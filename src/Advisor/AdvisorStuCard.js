import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function SimpleCard(props) {
    const { classes, students } = props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Perry Platypus
                    </Typography>
                    <Typography variant="h5" component="h2">
                        <p><strong>Major:</strong>Computer Science</p>
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Appointment @ 12:30 on 4/30/19
                    </Typography>
                    <Typography component="p">
                        <strong>Units:</strong> 78
                        <br/>
                        <strong>Education Start:</strong> Fall 2015
                        <br/>
                        <strong>Expected Graduation:</strong> Spring 2019
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
    )
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);