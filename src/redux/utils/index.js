import { schema } from 'normalizr';

/**
 * Returns the redux type
 */
export const getReduxType = (status, method, entityName) => (
  `${status}_${method}_${entityName}`.toUpperCase()
);

/**
 * Computes the url to be called depending on the action
 * (This will be different for every project)
 */
export const computeUrl = (method, action) => {
  const entity_name = action.options.api || action.meta.type === 'multi' || action.params.api  ? 
    action.meta.entityName.endsWith('y') ? 
      `${action.meta.entityName.substring(0, action.meta.entityName.length - 1)}ies` 
      : `${action.meta.entityName}s` : action.meta.entityName

  if (method === 'POST' && action.meta.entityName === 'user') {
    return `auth-tokens`;
  }
  if (action.type.includes('ADD') || action.type.includes('REMOVE')) {
    const {
      parentName, entityName, parentId, entityIds,
    } = action.meta;
    return `${parentName}/${parentId}/${entityName}/${entityIds}`;
  }
  if (method === 'GET' && action.meta.type === 'multi') {
    if(action.params.parentName && action.params.parentId){
      const parentName = action.params.parentName.endsWith('y') ? 
        `${action.params.parentName.substring(0, action.params.parentName.length - 1)}ies`
        : `${action.params.parentName}s`
        
      return `${parentName}/${action.params.parentId}/${entity_name}`
    }
    return entity_name
  }
  if (method === 'GET' || method === 'PUT' || method === 'PATCH') {
    return `${entity_name}/${action.meta.identifier}`;
  }
  if (method === 'POST') {
    return `${entity_name}`;
  }
  if (method === 'DELETE') {
    return `${entity_name}/${action.params.id}`;
  }
  return '';
};

/**
 * Returns the plural of an entity name
 */
const pluralizeEntityName = (plural, key) => (
  plural || `${key}s`
);

/**
 * Computes entity.define({ ... }) for normalizr library
 */
const getDefinition = (definitions, entities) => (
  definitions.reduce((result, definition) => {
    if (typeof definition === 'object') {
      const key = Object.keys(definition)[0];
      const value = definition[key];
      return { ...result, [key]: entities[value] };
    }
    return { ...result, [definition]: entities[definition] };
  }, {})
);

/**
 * Computes schema using normalizr Entity and Array
 */
export const computeSchema = (userSchema) => {
  const entities = Object.keys(userSchema).reduce((result, key) => {
    const keySchema = userSchema[key];
    const entitySchema = new schema.Entity(key);
    const entitiesSchema = new schema.Array(entitySchema);
    const pluralKey = pluralizeEntityName(keySchema.plural, key);
    return { ...result, [key]: entitySchema, [pluralKey]: entitiesSchema };
  }, {});

  Object.keys(userSchema).forEach((key) => {
    const keySchema = userSchema[key];
    const definition = getDefinition(keySchema.define, entities);
    entities[key].define(definition);
  });
  return entities;
};
