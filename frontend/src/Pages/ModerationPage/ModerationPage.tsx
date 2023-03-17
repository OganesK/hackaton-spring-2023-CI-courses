import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import Navbar from '../../Components/UI/NavBar/NavBar';
import Loading from '../../Components/UI/Loading/Loading';
import useStyles from '../../Components/UI/Styles/TS/TextStyles/style';
import FilterLine from '../../Components/UI/FilterLine/FilterLine';

import Footer from '../../Components/Home/Footer/Footer';

import ModerationContentBlock from '../../Components/ModerationPage/ModerationContentBlock';
import Line from '../../Components/UI/Line/Line';

import * as query from './graphql/query';
import * as types from './typings';

const ModerationPage: () => JSX.Element = () => {
  const [typeValue, setTypeValue] = useState('');
  const classes = useStyles();
  const [filter, setFilter] = useState('Публикации');

  const [notVerificatedPosts, setNotVerificatedPosts] = useState<types.PostTypes[] | undefined>([]);
  const [notVerificatedCompanies, setNotVerificatedCompanies] = useState<types.CompanyTypes[] | undefined>([]);
  const [notVerificatedContacts, setNotVerificatedContacts] = useState<types.ContactTypes[] | undefined>([]);
  const [notVerificatedEvents, setNotVerificatedEvents] = useState<types.EventTypes[] | undefined>([]);
  const [notVerificatedProjects, setNotVerificatedProjects] = useState<types.ProjectTypes[] | undefined>([]);
  const [notVerificatedCrowds, setNotVerificatedCrowds] = useState<types.CrowdTypes[] | undefined>([]);

  const {
    data: postData,
    loading: postLoading,
    refetch: postsRefetch,
  } = useQuery<{
    getAllNonVerificatedPosts: types.PostTypes[];
  }>(query.GET_ALL_NON_VERIFICATED_POSTS_QUERY);

  const {
    data: projectData,
    loading: projectLoading,
    refetch: projectRefetch,
  } = useQuery<{
    getAllNonVerificatedProjects: types.ProjectTypes[];
  }>(query.GET_ALL_NON_VERIFICATED_PROJECTS_QUERY);

  const {
    data: companyData,
    loading: companyLoading,
    refetch: companiesRefetch,
  } = useQuery<{
    getAllNonVerificatedCompanies: types.CompanyTypes[];
  }>(query.GET_ALL_NON_VERIFICATED_COMPANIES_QUERY);

  const {
    data: eventData,
    loading: eventLoading,
    refetch: eventsRefetch,
  } = useQuery<{
    getAllNonVerificatedEvents: types.EventTypes[];
  }>(query.GET_ALL_NON_VERIFICATED_EVENTS_QUERY);

  const {
    data: contactData,
    loading: contactLoading,
    refetch: contactsRefetch,
  } = useQuery<{
    getAllNonVerificatedContacts: types.ContactTypes[];
  }>(query.GET_ALL_NON_VERIFICATED_CONTACTS_QUERY);

  const {
    data: crowdData,
    loading: crowdLoading,
    refetch: crowdsRefetch,
  } = useQuery<{
    getAllNonVerificatedCrowdFunding: types.CrowdTypes[];
  }>(query.GET_ALL_NON_VERIFICATED_CROWDS_QUERY);

  // const {
  //   data: postUpdatedData,
  //   loading: postUpdatedLoading,
  //   refetch: postUpdatedRefetch,
  // } = useQuery<{
  //   getAllPostUpdatedVariables: types.PostTypes[];
  // }>(query.GET_ALL_UPDATED_POSTS);

  // const { data: projectUpdatedData, loading: projectUpdatedLoading } = useQuery<{
  //   getAllProjectUpdatedVariables: types.ProjectTypes[];
  // }>(query.GET_ALL_UPDATED_PROJECTS);

  // const { data: companyUpdatedData, loading: companyUpdatedLoading } = useQuery<{
  //   getAllCompanyUpdatedVariables: types.CompanyTypes[];
  // }>(query.GET_ALL_UPDATED_COMPANIES);

  // const { data: eventUpdatedData, loading: eventUpdatedLoading } = useQuery<{
  //   getAllEventUpdatedVariables: types.EventTypes[];
  // }>(query.GET_ALL_UPDATED_EVENTS);

  // const {
  //   data: contactUpdatedData,
  //   loading: contactUpdatedLoading,
  //   refetch,
  // } = useQuery<{
  //   getAllContactUpdatedVariables: types.ContactTypes[];
  // }>(query.GET_ALL_UPDATED_CONTACTS);

  useEffect(() => {
    if (!postLoading || !crowdLoading || !companyLoading || !eventLoading || !projectLoading) {
      setTypeValue('created');
      if (typeValue === 'created') {
        setNotVerificatedCompanies(companyData?.getAllNonVerificatedCompanies);
        setNotVerificatedContacts(contactData?.getAllNonVerificatedContacts);
        setNotVerificatedProjects(projectData?.getAllNonVerificatedProjects);
        setNotVerificatedEvents(eventData?.getAllNonVerificatedEvents);
        setNotVerificatedPosts(postData?.getAllNonVerificatedPosts);
        setNotVerificatedCrowds(crowdData?.getAllNonVerificatedCrowdFunding);
      } else {
        // setNotVerificatedCompanies(companyUpdatedData ? companyUpdatedData.getAllCompanyUpdatedVariables : []);
        // setNotVerificatedContacts(contactUpdatedData ? contactUpdatedData.getAllContactUpdatedVariables : []);
        // setNotVerificatedProjects(projectUpdatedData ? projectUpdatedData.getAllProjectUpdatedVariables : []);
        // setNotVerificatedEvents(eventUpdatedData ? eventUpdatedData.getAllEventUpdatedVariables : []);
        // setNotVerificatedPosts(postUpdatedData ? postUpdatedData.getAllPostUpdatedVariables : []);
      }
    }
  }, [typeValue, postLoading, projectLoading, companyLoading, contactLoading, eventLoading, crowdLoading]);

  if (
    postLoading ||
    projectLoading ||
    companyLoading ||
    contactLoading ||
    eventLoading ||
    crowdLoading
    // postUpdatedLoading ||
    // projectUpdatedLoading ||
    // companyUpdatedLoading ||
    // contactUpdatedLoading ||
    // eventUpdatedLoading
  ) {
    return <Loading />;
  }

  return (
    <Grid container xs={12} justifyContent="center">
      <Navbar text="qwe" />
      <Grid container xs={10} style={{ gap: 20 }}>
        <Grid container className={classes.sloganText}>
          Модерация
        </Grid>
        {/* <TypeRadioGroup value={typeValue} setValue={setTypeValue} /> */}
        <Grid container direction="column">
          <FilterLine selectedCategory={filter} setSelectedCategory={setFilter} isModerationPage />
          <Line />
          {filter === 'Проекты'
            ? notVerificatedProjects &&
              notVerificatedProjects.map(project => (
                <ModerationContentBlock
                  projectRefetch={projectRefetch}
                  companiesRefetch={companiesRefetch}
                  postsRefetch={postsRefetch}
                  contactsRefetch={contactsRefetch}
                  eventsRefetch={eventsRefetch}
                  crowdsRefetch={crowdsRefetch}
                  key={project.id}
                  id={project.id}
                  title={
                    typeValue !== 'created'
                      ? project.name !== null
                        ? `${project.name}----changed`
                        : `${project.project!.name}`
                      : project.name
                  }
                  description={
                    typeValue !== 'created'
                      ? project.shortDescription !== null
                        ? `${project.shortDescription}----changed`
                        : `${project.project!.shortDescription}`
                      : project.shortDescription
                  }
                  poster={project.poster && project.poster.link}
                  presentationMedia={project.presentationMedia && project.presentationMedia.link}
                  shortDescription={
                    typeValue !== 'created'
                      ? project.shortDescription !== null
                        ? `${project.shortDescription}----changed`
                        : `${project.project!.shortDescription}`
                      : project.shortDescription
                  }
                  article={project.description}
                  type="Проект"
                  owner={
                    typeValue !== 'created'
                      ? project.ownerCompany?.name !== null
                        ? `${project.ownerCompany?.name}`
                        : `${project.project!.ownerCompany?.name}`
                      : project.ownerCompany?.name
                  }
                  createdAt={
                    typeValue !== 'created'
                      ? project.createdAt !== null
                        ? project.createdAt
                        : project.project?.createdAt
                      : project.createdAt
                  }
                  categoryOfObject={
                    typeValue !== 'created'
                      ? project.category !== null
                        ? `${project.category}`
                        : `${project.project!.category}`
                      : project.category
                  }
                  isNew={typeValue === 'created'}
                  isProject={true}
                />
              ))
            : filter === 'Публикации'
            ? notVerificatedPosts &&
              notVerificatedPosts.map(post => (
                <ModerationContentBlock
                  projectRefetch={projectRefetch}
                  companiesRefetch={companiesRefetch}
                  postsRefetch={postsRefetch}
                  contactsRefetch={contactsRefetch}
                  eventsRefetch={eventsRefetch}
                  crowdsRefetch={crowdsRefetch}
                  key={post.id}
                  id={post.id}
                  title={
                    typeValue !== 'created'
                      ? post.title !== null
                        ? `${post.title}----changed`
                        : `${post.post!.title}`
                      : post.title
                  }
                  description={
                    typeValue !== 'created'
                      ? post.articleBody !== null
                        ? `${post.articleBody}----changed`
                        : `${post.post!.articleBody}`
                      : post.articleBody
                  }
                  poster={post.poster && post.poster.link}
                  shortDescription={
                    typeValue !== 'created'
                      ? post.description !== null
                        ? `${post.description}----changed`
                        : `${post.post!.description}`
                      : post.description
                  }
                  article={post.article}
                  type="Публикация"
                  owner={
                    typeValue !== 'created'
                      ? post.project?.name !== null
                        ? `${post.project?.name}`
                        : `${post.post!.project?.name}`
                      : post.project?.name
                  }
                  createdAt={post.createdAt}
                  isNew={typeValue === 'created'}
                  isPost={true}
                  isPostNews={post.isNews ? post.isNews : post.post?.isNews}
                  isPostOffer={post.isOffer ? post.isOffer : post.post?.isOffer}
                  isPostResource={post.isResource ? post.isResource : post.post?.isResource}
                />
              ))
            : filter === 'Компании'
            ? notVerificatedCompanies &&
              notVerificatedCompanies.map(company => (
                <ModerationContentBlock
                  projectRefetch={projectRefetch}
                  companiesRefetch={companiesRefetch}
                  postsRefetch={postsRefetch}
                  contactsRefetch={contactsRefetch}
                  eventsRefetch={eventsRefetch}
                  crowdsRefetch={crowdsRefetch}
                  key={company.id}
                  id={company.id}
                  title={
                    typeValue !== 'created'
                      ? company.name !== null
                        ? `${company.name}----changed`
                        : `${company.company!.name}`
                      : company.name
                  }
                  description={
                    typeValue !== 'created'
                      ? company.description !== null
                        ? `${company.description}----changed`
                        : `${company.company!.description}`
                      : company.description
                  }
                  poster={company.avatar && company.avatar.link}
                  shortDescription={
                    typeValue !== 'created'
                      ? company.shortDescription !== null
                        ? `${company.shortDescription}----changed`
                        : `${company.company!.shortDescription}`
                      : company.shortDescription
                  }
                  type="Компания"
                  owner={`${company.owner?.firstname} ${company?.owner?.lastname}`}
                  createdAt={company.createdAt}
                  categoryOfObject={company.activityKind}
                  isNew={typeValue === 'created'}
                  isCompany={true}
                />
              ))
            : filter === 'Мероприятия'
            ? notVerificatedEvents &&
              notVerificatedEvents.map(event => (
                <ModerationContentBlock
                  projectRefetch={projectRefetch}
                  companiesRefetch={companiesRefetch}
                  postsRefetch={postsRefetch}
                  contactsRefetch={contactsRefetch}
                  eventsRefetch={eventsRefetch}
                  crowdsRefetch={crowdsRefetch}
                  key={event.id}
                  id={event.id}
                  title={
                    typeValue !== 'created'
                      ? event.name !== null
                        ? `${event.name}----changed`
                        : `${event.event!.name}`
                      : event.name
                  }
                  description={
                    typeValue !== 'created'
                      ? event.description !== null
                        ? `${event.description}----changed`
                        : `${event.event!.description}`
                      : event.description
                  }
                  poster={event.poster && event.poster.link}
                  shortDescription={
                    typeValue !== 'created'
                      ? event.shortDescription !== null
                        ? `${event.shortDescription}----changed`
                        : `${event.event!.shortDescription}`
                      : event.shortDescription
                  }
                  type="Мероприятие"
                  user={event.user}
                  owner={''}
                  organizer={event.organizer}
                  createdAt={event.date}
                  address={event.address}
                  theme={event.theme}
                  format={event.format}
                  categoryOfObject={event.category}
                  isNew={typeValue === 'created'}
                  isEvent={true}
                />
              ))
            : filter === 'Краудфандинги'
            ? notVerificatedCrowds &&
              notVerificatedCrowds.map(crowd => (
                <ModerationContentBlock
                  projectRefetch={projectRefetch}
                  companiesRefetch={companiesRefetch}
                  postsRefetch={postsRefetch}
                  contactsRefetch={contactsRefetch}
                  eventsRefetch={eventsRefetch}
                  crowdsRefetch={crowdsRefetch}
                  key={crowd.id}
                  id={crowd.id}
                  title={
                    typeValue !== 'created'
                      ? crowd.title !== null
                        ? `${crowd.title}----changed`
                        : `${crowd.crowdFunding!.title}`
                      : crowd.title
                  }
                  description={
                    typeValue !== 'created'
                      ? crowd.shortDescription !== null
                        ? `${crowd.shortDescription}----changed`
                        : `${crowd.crowdFunding!.shortDescription}`
                      : crowd.shortDescription
                  }
                  poster={crowd.poster && crowd.poster.link}
                  shortDescription={
                    typeValue !== 'created'
                      ? crowd.shortDescription !== null
                        ? `${crowd.shortDescription}----changed`
                        : `${crowd.crowdFunding!.shortDescription}`
                      : crowd.shortDescription
                  }
                  article={crowd.story}
                  type="Краудфандинг"
                  owner={crowd.project.name}
                  createdAt={crowd.createdAt}
                  isNew={typeValue === 'created'}
                  isCrowd={true}
                  tariffs={crowd.tariffs}
                />
              ))
            : notVerificatedContacts &&
              notVerificatedContacts.map(contact => (
                <ModerationContentBlock
                  projectRefetch={projectRefetch}
                  companiesRefetch={companiesRefetch}
                  postsRefetch={postsRefetch}
                  contactsRefetch={contactsRefetch}
                  eventsRefetch={eventsRefetch}
                  crowdsRefetch={crowdsRefetch}
                  id={contact.id}
                  key={contact.id}
                  description={
                    contact.phones.join(' ') + '\n' + contact.emails.join(' ') + '\n' + contact.adresses.join(' ')
                  }
                  title={
                    typeValue !== 'created'
                      ? contact.ownerCompany?.name !== null
                        ? `${contact.ownerCompany?.name}`
                        : `${contact.contact!.ownerCompany?.name}`
                      : contact.ownerCompany?.name
                  }
                  poster={contact.ownerCompany?.avatar}
                  shortDescription={contact.phones[0]}
                  type="Контакты"
                  owner={contact.ownerCompany?.name}
                  ownerCompanyId={contact.ownerCompany?.id}
                  isNew={typeValue === 'created'}
                  isContact={true}
                  isContactPhones={
                    typeValue !== 'created'
                      ? contact.phones.join(' ') !== null
                        ? `${contact.phones.join(' ')}----changed`
                        : contact.phones.join(' ')
                      : contact.phones.join(' ')
                  }
                  isContactAddresses={
                    typeValue !== 'created'
                      ? contact.adresses.join(' ') !== null
                        ? `${contact.adresses.join(' ')}----changed`
                        : contact.adresses.join(' ')
                      : contact.adresses.join(' ')
                  }
                  isContactEmails={
                    typeValue !== 'created'
                      ? contact.emails.join(' ') !== null
                        ? `${contact.emails.join(' ')}----changed`
                        : contact.emails.join(' ')
                      : contact.emails.join(' ')
                  }
                />
              ))}
        </Grid>
      </Grid>
      <Footer footerMobileTopIdent={120} footerTopIdent={200} />
    </Grid>
  );
};

export default ModerationPage;
