module.exports = (ctx, next) => {

  const currentUser = ctx.state.user.id
  const targetUser = ctx.params.id

  // if (currentUser === targetUser) {
  //   return next()
  // }

  // ctx.unauthorized('You can only mess with your own page!')

  if (currentUser !== targetUser) {
    ctx.unauthorized('You can only mess with your own page!')
  }

  console.log('Policy currentUser', currentUser)
  console.log('Policy targetUser', targetUser)
  console.log('calling next now')
  return next()
}

