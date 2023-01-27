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
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const links = document.querySelectorAll('.tocHeader');
	for (const link of links) {
		link.addEventListener('click', clickHandler);
	}
	function clickHandler(e) {
		e.preventDefault();

		const href = this.getAttribute('href');

		document.querySelector(href).scrollIntoView({
			behavior: 'smooth',
		});
	}

	return (
		<div className={styles.processWrapper}>
			<div className={styles.buttons}>
				<div
					className={styles.arrow}
					onClick={() => {
						navigate('/');
					}}
				>
					<Icon icon="mdi:arrow-left-circle-outline" style={{ width: '3rem', height: '3rem' }} />
					Back
				</div>
				<div className={styles.language}>
					<LanguagePicker />
				</div>
			</div>
			<div className={styles.textWrapper}>
				<h1 className={styles.title}>{t('process.title')}</h1>
				<div className={styles.toc}>
					<ol>
						<li href="#tocIntro" className="tocHeader">
							{t('process.tocIntro')}
						</li>
						<li href="#tocTechStack" className="tocHeader">
							{t('process.tocTechStack')}
						</li>
						<li href="#tocDependencies" className="tocHeader">
							{t('process.tocDependencies')}
						</li>
						<li href="#tocTools" className="tocHeader">
							{t('process.tocTools')}
						</li>
						<li href="#tocUI" className="tocHeader">
							{t('process.tocUI')}
						</li>
						<li href="#tocAPI" className="tocHeader">
							{t('process.tocAPI')}
						</li>
						<li href="#tocDatabase" className="tocHeader">
							{t('process.tocDatabase')}
						</li>
						<li href="#tocBreakdown" className="tocHeader">
							{t('process.tocBreakdown')}
						</li>
					</ol>
				</div>

				<h2 id="tocIntro" className="tocIntro">
					{t('process.tocIntro')}
				</h2>
				<span>{t('process.introText1')}</span>
				<a href="https://www.codecademy.com/learn/paths/full-stack-engineer-career-path">{t('process.introText2')}</a>
				<span>{t('process.introText3')}</span>

				<h2 id="tocTechStack" className={styles.stackText}>
					{t('process.tocTechStack')}
				</h2>
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
						<p>React ( + react-router-dom)</p>
					</li>
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
							<p>Passport.js (passport-local + passport-google-oauth20)</p>
						</li>
					</ul>
					<li>
						<p>PostgreSQL (via Supabase)</p>
					</li>
				</ul>

				<h2 id="tocDependencies" className={styles.thanks}>
					{t('process.tocDependencies')}
				</h2>
				<p className={styles.thanks}>{t('process.thanks')}</p>
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

				<h2 id="tocTools" className={styles.toolsText}>
					{t('process.tocTools')}
				</h2>
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
					<li>
						<a href="https://editor.swagger.io/?url=https://raw.githubusercontent.com/LongWyrsch/Grocery-list_backend/main/openapi.yaml">Swagger Editor</a>
						<p>{t('process.swagger')}</p>
					</li>
				</ul>

				<h2 id="tocUI">{t('process.tocUI')}</h2>
				<div className={styles.uiDescription}>
					{t('process.ui1')}
					<a href="https://www.figma.com/file/9OlfnA8kMP0qOKD7AdNueG/Grocery-list-test-colors?node-id=49823%3A12141&t=U9DtttpAPiU3KGKu-1">{t('process.ui2')}</a>.
				</div>
				<ul className={styles.ui}>
					<li>{t('process.ui3')}</li>
					<li>
						<a href="https://www.figma.com/community/file/1035203688168086460">Material 3 Design Kit</a>
						{t('process.ui4')}
					</li>
					<li>
						<a href="https://www.figma.com/community/plugin/1034969338659738588/Material-Theme-Builder">Material Theme Builder</a>
						{t('process.ui5')}
					</li>
					<li>
						<a href="https://www.figma.com/community/plugin/816737626312049592">Export styles to CSS variables</a>
						{t('process.ui6')}
					</li>
				</ul>
				<iframe
					title="wireframe"
					style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
					width="800"
					height="450"
					src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F9OlfnA8kMP0qOKD7AdNueG%2FGrocery-list-test-colors%3Fnode-id%3D52696%253A23854%26t%3DYErgZuNh3u14Asp6-1"
					allowFullScreen
				></iframe>
				<div className={styles.figureDescription}>Wireframe</div>

				<h2 id="tocAPI">{t('process.tocAPI')}</h2>
				<p>
					<a href="https://editor.swagger.io/?url=https://raw.githubusercontent.com/LongWyrsch/Grocery-list_backend/main/openapi.yaml">{t('process.api1')}</a>
					{t('process.api2')}
				</p>

				<h2 id="tocDatabase" className={styles.databaseTitle}>
					{t('process.tocDatabase')}
				</h2>
				<div className={styles.databaseDescription}>{t('process.databaseText')}</div>
				<div className={styles.dbdiagram}>
					<iframe title="schema" width="560" height="315" src="https://dbdiagram.io/embed/639da5ca99cb1f3b55a1fb97">
						{' '}
					</iframe>
				</div>
				<div className={styles.figureDescription}>{t('process.schema')}</div>

				<h2 id="tocBreakdown" className={styles.breakdownTitle}>
					{t('process.tocBreakdown')}
				</h2>
			</div>
			<div className={styles.gantt}>
				<Mermaid chart={ganttData} />
			</div>
		</div>
	);
};
