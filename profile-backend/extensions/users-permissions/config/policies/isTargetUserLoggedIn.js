module.exports = (ctx, next) => {

  const currentUser = ctx.state.user.id
  const targetUser = ctx.params.id

  if (currentUser !== targetUser) {
    ctx.unauthorized('You can only mess with your own page!')
  }
  return next()
}

