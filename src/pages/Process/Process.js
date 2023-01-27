import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import styles from './Process.module.css';

// components
import { Mermaid } from './Mermaid';
import { ganttData } from './ganttData';

// libs
import { useTranslation } from 'react-i18next';
import { LanguagePicker } from '../../features/languages/components/LanguagePicker';
import { Icon } from '@iconify/react';


export const Process = () => {
	const { t } = useTranslation();
	const navigate=useNavigate()

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={styles.processWrapper}>
			<div className={styles.buttons}>
				<div className={styles.arrow} onClick={() => { navigate('/') }}>
					<Icon icon="mdi:arrow-left-circle-outline" style={{width: '3rem', height: '3rem'}}/>
					Back
				</div>
				<div className={styles.language}>
					<LanguagePicker />
				</div>
			</div>
			<div className={styles.textWrapper}>
				<h1 className={styles.welcome}>{t('process.welcome')}</h1>
				<h2 className={styles.thanks}>{t('process.thanks')}</h2>
				<ul className={styles.libraries}>
					<h3>Frontend</h3>
					<li>
						<a href="https://iconify.design/">Iconify for React</a>
						<p>{t('process.iconify')}</p>
					</li>
					<li>
						<a href="https://boringavatars.com/">Boring Avatars</a>
						<p>{t('process.avatar')}</p>
					</li>
					<li>
						<a href="https://react.i18next.com/">react-i18next</a>
						<p>{t('process.i18next')}</p>
					</li>
					<li>
						<a href="https://thednp.github.io/kute.js/">KUTE.js</a>
						<p>{t('process.kute')}</p>
					</li>
					<li>
						<a href="https://mermaid.js.org/">Mermaid</a>
						<p>{t('process.mermaid')}</p>
					</li>
					<li>
						<a href="https://github.com/atlassian/react-beautiful-dnd#readme">react-beautiful-dnd</a>
						<p>{t('process.dnd')}</p>
					</li>
					<li>
						<a href="https://github.com/react-grid-layout/react-grid-layout">react-grid-layout</a>
						<p>{t('process.grid')}</p>
					</li>
					<li>
						<a href="https://github.com/react-icons/react-icons#readme">React Icons</a>
						<p>{t('process.icon')}</p>
					</li>
					<li>
						<a href="https://github.com/thebuilder/react-intersection-observer#readme">react-intersection-observer</a>
						<p>{t('process.observer')}</p>
					</li>
					<li>
						<a href="https://react-scroll-parallax.damnthat.tv/docs/intro">React Scroll Parallax</a>
						<p>{t('process.parallax')}</p>
					</li>
					<li>
						<a href="https://github.com/uuidjs/uuid">uuid</a>
						<p>{t('process.uuid')}</p>
					</li>
					<h3>Backend</h3>
					<li>
						<a href="https://github.com/hapijs/joi#readme">joi</a>
						<p>{t('process.joi')}</p>
					</li>
					<li>
						<a href="https://github.com/expressjs/cors">cors</a>
						<p>{t('process.cors')}</p>
					</li>
					<li>
						<a href="https://github.com/kelektiv/node.bcrypt.js">node.bcrypt.js</a>
						<p>{t('process.bcrypt')}</p>
					</li>
					<li>
						<a href="https://github.com/motdotla/dotenv">dotenv</a>
						<p>{t('process.env')}</p>
					</li>
				</ul>
				<h2 className={styles.stackText}>Tech stack</h2>
				<ul className={styles.stack}>
					<li>
						<p>HTML</p>
					</li>
					<li>
						<p>CSS</p>
					</li>
					<li>
						<p>JS</p>
					</li>
					<li>
						<p>React</p>
					</li>
					<ul>
						<li>
							<p>react-router-dom</p>
						</li>
						<li>
							<p>Redux</p>
						</li>
					</ul>
					<li>
						<p>Redux</p>
					</li>
					<li>
						<p>Node.js</p>
					</li>
					<ul>
						<li>
							<p>Express.js (express-session)</p>
						</li>
						<li>
							<p>Passport.js (passport-local)</p>
						</li>
						<li>
							<p>Passport.js (passport-google-oauth20)</p>
						</li>
					</ul>
					<li>
						<p>PostgreSQL (via Supabase)</p>
					</li>
				</ul>
				<h2 className={styles.toolsText}>{t('process.tools')}</h2>
				<ul className={styles.tools}>
					<li>
						<a href="https://www.figma.com/">Figma</a>
						<p>{t('process.figma')}</p>
					</li>
					<li>
						<a href="https://dbdiagram.io/home">dbdiagram.io</a>
						<p>{t('process.dbdiagram')}</p>
					</li>
					<li>
						<a href="https://supabase.com/">Supabase</a>
						<p>{t('process.supabase')}</p>
					</li>
					<li>
						<a href="https://code.visualstudio.com/">Visual Studio Code</a>{' '}
					</li>
					<li>
						<a href="https://git-scm.com/">Git</a>
						<p>{t('process.git')}</p>
					</li>
					<li>
						<a href="https://github.com/">GitHub</a>
						<p>{t('process.github')}</p>
					</li>
					<li>
						<a href="https://www.netlify.com/">Netlify</a>
						<p>{t('process.netlify')}</p>
					</li>
					<li>
						<a href="https://railway.app/">Railway</a>
						<p>{t('process.railway')}</p>
					</li>
				</ul>
				<h2>UI design</h2>
				<div className={styles.uiDescription}>{t('process.ui1')}<a href='https://www.figma.com/file/9OlfnA8kMP0qOKD7AdNueG/Grocery-list-test-colors?node-id=49823%3A12141&t=U9DtttpAPiU3KGKu-1'>{t('process.ui2')}</a>.</div>
				<ul className={styles.ui}>
					<li>{t('process.ui3')}</li>
					<li><a href='https://www.figma.com/community/file/1035203688168086460'>Material 3 Design Kit</a>{t('process.ui4')}</li>
					<li><a href='https://www.figma.com/community/plugin/1034969338659738588/Material-Theme-Builder'>Material Theme Builder</a>{t('process.ui5')}</li>
					<li><a href='https://www.figma.com/community/plugin/816737626312049592'>Export styles to CSS variables</a>{t('process.ui6')}</li>
				</ul>
				<img className={styles.figure} src={require('../../assets/Wireframe.png')} alt="wireframe" />
				<div className={styles.figureDescription}>Wireframe</div>
				<h2 className={styles.databaseTitle}>{t('process.database')}</h2>
				<div className={styles.databaseDescription}>{t('process.databaseText')}</div>
				<img className={styles.figure} src={require('../../assets/Schema.png')} alt="Schema" />
				<div className={styles.figureDescription}>Schema</div>
				<h2 className={styles.breakdownTitle}>{t('process.finalthoughts')}</h2>
				<div className={styles.breakdownDescription}>{t('process.text')}</div>
				<h2 className={styles.breakdownTitle}>{t('process.projectBreakdown')}</h2>
			</div>
			<div className={styles.gantt}>
				<Mermaid chart={ganttData} />
			</div>
		</div>
	);
};
