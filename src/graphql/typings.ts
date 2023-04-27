import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Context = {
  authToken: string;
  tokenUserId: string;
};
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSONObject: string;
  URL: any;
};

export type DatasetAlias = {
  __typename?: 'DatasetAlias';
  alias: Scalars['String'];
};

export type DatasetReviewStatistics = {
  __typename?: 'DatasetReviewStatistics';
  aliases: Array<DatasetRow>;
  parentDataset: DatasetRow;
};

export type DatasetRow = {
  __typename?: 'DatasetRow';
  alias: Scalars['String'];
  datasetName: Scalars['String'];
  id: Scalars['String'];
  numCorrectlyPredicted: Scalars['Int'];
  numIncorrectlyPredicted: Scalars['Int'];
  numUnreviewed: Scalars['Int'];
};

export type DatasetStats = {
  __typename?: 'DatasetStats';
  dataset: Scalars['String'];
  numPublications: Scalars['Int'];
  numTopics: Scalars['Int'];
  topics: Array<Topic>;
};

export type MlModelStatistics = {
  __typename?: 'MLModelStatistics';
  datasets: Array<DatasetStats>;
  totalDatasets: Scalars['Int'];
  totalPublications: Scalars['Int'];
  totalTopics: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Scalars['String'];
  root?: Maybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  user: UserReq;
};

export type ParentDataset = {
  __typename?: 'ParentDataset';
  aliases: Array<DatasetAlias>;
  dataset: Scalars['String'];
};

export type Privilege = {
  __typename?: 'Privilege';
  agency: Scalars['String'];
  roles: Array<Role>;
  runId: Scalars['String'];
};

export type Progress = {
  __typename?: 'Progress';
  numReviewedSnippets: Scalars['Int'];
  numTotalSnippets: Scalars['Int'];
  percentage: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getDatasetAliases: Array<ParentDataset>;
  getDatasetReviewStats: Array<DatasetReviewStatistics>;
  getMLModelStats: MlModelStatistics;
  getReviewers: Array<ReviewerStatistics>;
  getStats: Statistics;
  getTopicsPubs: Array<TopicPub>;
  getUser: User;
  root?: Maybe<Scalars['String']>;
};


export type QueryGetDatasetAliasesArgs = {
  runId: Scalars['Int'];
};


export type QueryGetDatasetReviewStatsArgs = {
  runId: Scalars['Int'];
};


export type QueryGetMlModelStatsArgs = {
  runId: Scalars['Int'];
};


export type QueryGetReviewersArgs = {
  runId: Scalars['Int'];
};


export type QueryGetStatsArgs = {
  runId: Scalars['Int'];
};


export type QueryGetTopicsPubsArgs = {
  runId: Scalars['Int'];
};

export enum Role {
  Admin = 'ADMIN',
  Reviewer = 'REVIEWER',
  Sysadmin = 'SYSADMIN'
}

export type Reviewer = {
  __typename?: 'Reviewer';
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  roles: Array<Role>;
};

export type ReviewerStatistics = {
  __typename?: 'ReviewerStatistics';
  numAssignedSnippets: Scalars['Int'];
  numReviewedSnippets: Scalars['Int'];
  numUnReviewedSnippets: Scalars['Int'];
  reviewer: Reviewer;
};

export type Statistics = {
  __typename?: 'Statistics';
  numDatasets: Scalars['Int'];
  numDyads: Scalars['Int'];
  numMentionCandidates: Scalars['Int'];
  numPublications: Scalars['Int'];
  numSnippetsNonEmpty: Scalars['Int'];
  numSnippetsTotal: Scalars['Int'];
  numTotalDyads: Scalars['Int'];
  progress: Progress;
  runId: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  root?: Maybe<Scalars['String']>;
};

export type Topic = {
  __typename?: 'Topic';
  numOccurrences: Scalars['Int'];
  topic: Scalars['String'];
};

export type TopicPub = {
  __typename?: 'TopicPub';
  numPublications: Scalars['Int'];
  topic: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  privileges: Array<Privilege>;
};

export type UserReq = {
  password: Scalars['String'];
  username: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DatasetAlias: ResolverTypeWrapper<DatasetAlias>;
  DatasetReviewStatistics: ResolverTypeWrapper<DatasetReviewStatistics>;
  DatasetRow: ResolverTypeWrapper<DatasetRow>;
  DatasetStats: ResolverTypeWrapper<DatasetStats>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  MLModelStatistics: ResolverTypeWrapper<MlModelStatistics>;
  Mutation: ResolverTypeWrapper<{}>;
  ParentDataset: ResolverTypeWrapper<ParentDataset>;
  Privilege: ResolverTypeWrapper<Privilege>;
  Progress: ResolverTypeWrapper<Progress>;
  Query: ResolverTypeWrapper<{}>;
  ROLE: Role;
  Reviewer: ResolverTypeWrapper<Reviewer>;
  ReviewerStatistics: ResolverTypeWrapper<ReviewerStatistics>;
  Statistics: ResolverTypeWrapper<Statistics>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Topic: ResolverTypeWrapper<Topic>;
  TopicPub: ResolverTypeWrapper<TopicPub>;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  User: ResolverTypeWrapper<User>;
  UserReq: UserReq;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  DatasetAlias: DatasetAlias;
  DatasetReviewStatistics: DatasetReviewStatistics;
  DatasetRow: DatasetRow;
  DatasetStats: DatasetStats;
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  JSONObject: Scalars['JSONObject'];
  MLModelStatistics: MlModelStatistics;
  Mutation: {};
  ParentDataset: ParentDataset;
  Privilege: Privilege;
  Progress: Progress;
  Query: {};
  Reviewer: Reviewer;
  ReviewerStatistics: ReviewerStatistics;
  Statistics: Statistics;
  String: Scalars['String'];
  Subscription: {};
  Topic: Topic;
  TopicPub: TopicPub;
  URL: Scalars['URL'];
  User: User;
  UserReq: UserReq;
};

export type DatasetAliasResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DatasetAlias'] = ResolversParentTypes['DatasetAlias']> = {
  alias?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatasetReviewStatisticsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DatasetReviewStatistics'] = ResolversParentTypes['DatasetReviewStatistics']> = {
  aliases?: Resolver<Array<ResolversTypes['DatasetRow']>, ParentType, ContextType>;
  parentDataset?: Resolver<ResolversTypes['DatasetRow'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatasetRowResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DatasetRow'] = ResolversParentTypes['DatasetRow']> = {
  alias?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  datasetName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numCorrectlyPredicted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numIncorrectlyPredicted?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numUnreviewed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatasetStatsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DatasetStats'] = ResolversParentTypes['DatasetStats']> = {
  dataset?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numPublications?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numTopics?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  topics?: Resolver<Array<ResolversTypes['Topic']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MlModelStatisticsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MLModelStatistics'] = ResolversParentTypes['MLModelStatistics']> = {
  datasets?: Resolver<Array<ResolversTypes['DatasetStats']>, ParentType, ContextType>;
  totalDatasets?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPublications?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalTopics?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'user'>>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ParentDatasetResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ParentDataset'] = ResolversParentTypes['ParentDataset']> = {
  aliases?: Resolver<Array<ResolversTypes['DatasetAlias']>, ParentType, ContextType>;
  dataset?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PrivilegeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Privilege'] = ResolversParentTypes['Privilege']> = {
  agency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['ROLE']>, ParentType, ContextType>;
  runId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProgressResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Progress'] = ResolversParentTypes['Progress']> = {
  numReviewedSnippets?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numTotalSnippets?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  percentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getDatasetAliases?: Resolver<Array<ResolversTypes['ParentDataset']>, ParentType, ContextType, RequireFields<QueryGetDatasetAliasesArgs, 'runId'>>;
  getDatasetReviewStats?: Resolver<Array<ResolversTypes['DatasetReviewStatistics']>, ParentType, ContextType, RequireFields<QueryGetDatasetReviewStatsArgs, 'runId'>>;
  getMLModelStats?: Resolver<ResolversTypes['MLModelStatistics'], ParentType, ContextType, RequireFields<QueryGetMlModelStatsArgs, 'runId'>>;
  getReviewers?: Resolver<Array<ResolversTypes['ReviewerStatistics']>, ParentType, ContextType, RequireFields<QueryGetReviewersArgs, 'runId'>>;
  getStats?: Resolver<ResolversTypes['Statistics'], ParentType, ContextType, RequireFields<QueryGetStatsArgs, 'runId'>>;
  getTopicsPubs?: Resolver<Array<ResolversTypes['TopicPub']>, ParentType, ContextType, RequireFields<QueryGetTopicsPubsArgs, 'runId'>>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  root?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ReviewerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Reviewer'] = ResolversParentTypes['Reviewer']> = {
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['ROLE']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewerStatisticsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ReviewerStatistics'] = ResolversParentTypes['ReviewerStatistics']> = {
  numAssignedSnippets?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numReviewedSnippets?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numUnReviewedSnippets?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reviewer?: Resolver<ResolversTypes['Reviewer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatisticsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Statistics'] = ResolversParentTypes['Statistics']> = {
  numDatasets?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numDyads?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numMentionCandidates?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numPublications?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numSnippetsNonEmpty?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numSnippetsTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numTotalDyads?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  progress?: Resolver<ResolversTypes['Progress'], ParentType, ContextType>;
  runId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  root?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "root", ParentType, ContextType>;
};

export type TopicResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Topic'] = ResolversParentTypes['Topic']> = {
  numOccurrences?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  topic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicPubResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TopicPub'] = ResolversParentTypes['TopicPub']> = {
  numPublications?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  topic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privileges?: Resolver<Array<ResolversTypes['Privilege']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  DatasetAlias?: DatasetAliasResolvers<ContextType>;
  DatasetReviewStatistics?: DatasetReviewStatisticsResolvers<ContextType>;
  DatasetRow?: DatasetRowResolvers<ContextType>;
  DatasetStats?: DatasetStatsResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  MLModelStatistics?: MlModelStatisticsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ParentDataset?: ParentDatasetResolvers<ContextType>;
  Privilege?: PrivilegeResolvers<ContextType>;
  Progress?: ProgressResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reviewer?: ReviewerResolvers<ContextType>;
  ReviewerStatistics?: ReviewerStatisticsResolvers<ContextType>;
  Statistics?: StatisticsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Topic?: TopicResolvers<ContextType>;
  TopicPub?: TopicPubResolvers<ContextType>;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

