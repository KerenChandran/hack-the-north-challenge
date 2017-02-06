import React, { Component } from 'react';
import _ from 'lodash';
// import cx from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import './Skills.css';

const Skill = ({ skill, rating }) => (
  <div className="skill-pill">
    <span className="rating">{rating}</span>
    <span className="skill">{skill}</span>
  </div>
);

export default class extends Component {
  static defaultProps = {
    hideSkills: true
  }

  state = {
    hideSkills: this.props.hideSkills
  }

  showAllSkills = () => {
    this.setState({
      hideSkills: false
    });
  }

  render() {
    let { skills } = this.props;
    let { hideSkills } = this.state;

    let orderedSkills = _.sortBy(skills, skill => skill.rating);

    if (hideSkills) {
      let moreSkillsCount = orderedSkills.length - 10;
      orderedSkills = orderedSkills.slice(0, 10);

      return (
        <div>
          {orderedSkills.map((skill, index) => (
            <Skill key={index} skill={skill.skill} rating={skill.rating}/>
          ))}
          { moreSkillsCount > 0 ? (
            <FlatButton label={`+ ${moreSkillsCount} More`} onClick={this.showAllSkills}/>
          ): null}
        </div>
      )

    }

    return (
      <div>
        {orderedSkills.map((skill, index) => (
          <Skill key={index} skill={skill.skill} rating={skill.rating}/>
        ))}
      </div>
    );
  }
}
