/**
 * Higher order component for creating an entity
 */

/* Dependencies */
import React from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';

/* Actions */
import { createEntity } from '../../../redux/actions';

/* Selectors */
import { selectCreatedEntity, selectCreateEntityStatus } from '../../../redux/selectors';

const Container = ({ children, ...rest }) => children(rest);

const mapStateToProps = (state, ownProps) => ({
  createdEntity: selectCreatedEntity(state, ownProps.entityName, ownProps.uuid),
  status: selectCreateEntityStatus(state, ownProps.entityName, ownProps.uuid),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  create(body, options = {}) {
    const enhancedOptions = {
      ...options,
      onSuccess: (created) => {
        if (options.onSuccess) {
          options.onSuccess(created);
          ownProps.refreshUuid();
        }
        // We need to get a new uuid on success
      },
    };
    dispatch(
      createEntity(
        ownProps.entityName,
        ownProps.parentName,
        ownProps.parentId,
        ownProps.uuid,
        body,
        enhancedOptions,
      ),
    );
  },
});


// Here we are passing a unique id to the children to keep track of the operation as there
// is not id that we could use before the entity get created.
const ConnectedChildren = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);

const UuidContainer = (props) => {
  const [uuid,setUuid] = React.useState(v4())

  const refreshUuid = () => {
    setUuid(v4())
  }

  return (
    <ConnectedChildren
      {...props}
      refreshUuid={refreshUuid}
      uuid={uuid}
    />
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UuidContainer);
