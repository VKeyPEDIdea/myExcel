export function actionCreate(data, actionType) {
  return {
    type: actionType,
    data,
  };
}