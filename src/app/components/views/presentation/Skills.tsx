import React, { useEffect } from 'react';
import { Svg, Tab } from '../../shared';

import categories from '../../../../assets/json/skills.json';

import '../../../../assets/styles/components/views/presentation/skills.css';

export const Skills = () => {

  /**
   * Attach 'mouseenter' & 'mouseleave' events on given (DOM) Element's childrens,
   * that will toggle their classList with property 'hovered'
   * @param card
   */
  const toggleHoverEffect = (cards: Element | null) => {
    const mobile = window.innerWidth <= 625;
    if (cards) {
      const childs = cards.children;
      const size = mobile ? childs.length : childs.length - 1;
      for (let i = 0; i < size; i++) {
        childs[i].addEventListener('mouseenter', () => childs[i].parentElement?.classList.add('hovered'))
        childs[i].addEventListener('mouseleave', () => childs[i].parentElement?.classList.remove('hovered'))
      }
    }
  }

  useEffect(() => toggleHoverEffect(document.querySelector('#skills > #skills-wrapper')))

  return (
    <Tab id='skills' title='Domaines de compétences'>
      <div id="skills-wrapper">
        {[...categories].reverse().map(({ title, skills }, index) => <Category key={index} title={title} skills={skills} />)}
      </div>
      
    </Tab>);

}

const Category = (category: {title: string, skills: any[]}) => 
    (<article className='card'>
      <header className="header">
        <h2>{category.title}</h2>
      </header>
      <section className="card-content">
        {category.skills.map((skill, i) => <Skill key={i} value={skill} className="card-skill" />)}
      </section>
      </article>)

const Skill = (skill: any) =>
  (<section className="skill">
    <aside className='is-primary'>
        <Svg styles='skill-icon' src='skills' name={skill.value.icon} />
    </aside>
    <div className="skill-content">
        <h3 className="name">{skill.value.name}</h3>
        <div className="infos">
            <p>{skill.value.level}</p>
            {skill.value.certified ? <Svg styles='graduated hoverable' src='ui' name='certified' /> : null}
            {skill.value.pro ? <Svg styles='pro hoverable' src='ui' name='pro' /> : null}
        </div>
    </div>
  </section>)