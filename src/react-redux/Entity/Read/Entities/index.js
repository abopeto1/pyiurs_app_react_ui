/**
 * Higher order component for reading multiple entities
 */

/* Dependencies */
import { connect } from 'react-redux';

/* Actions */
import { readEntities } from '../../../../redux/actions';

/* Selectors */
import { selectReadEntities, selectReadEntitiesStatus, selectReadEntitiesPagination } from '../../../../redux/selectors';

const Container = ({ children, ...rest }) => children(rest);

const mapStateToProps = (state, ownProps) => ({
  entities: selectReadEntities(state, ownProps.entityName, ownProps.params),
  status: selectReadEntitiesStatus(state, ownProps.entityName, ownProps.params),
  pagination: selectReadEntitiesPagination(state, ownProps.entityName, ownProps.params),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  read(options) {
    dispatch(
      readEntities(ownProps.entityName, ownProps.params, options),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
