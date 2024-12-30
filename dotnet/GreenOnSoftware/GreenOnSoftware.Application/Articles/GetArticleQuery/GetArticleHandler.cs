﻿using AutoMapper;
using GreenOnSoftware.Commons.Context;
using GreenOnSoftware.Commons.Dtos;
using GreenOnSoftware.Commons.Extensions;
using GreenOnSoftware.Commons.Resources;
using GreenOnSoftware.Core.Enums;
using GreenOnSoftware.DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace GreenOnSoftware.Application.Articles.GetArticleQuery;

internal class GetArticleHandler : IRequestHandler<GetArticle, Result<ArticleDto>>
{
    private readonly GreenOnSoftwareDbContext _dbContext;
    private readonly IMapper _mapper;
    private readonly IContext _context;

    public GetArticleHandler(GreenOnSoftwareDbContext dbContext, IMapper mapper, IContext context)
    {
        _dbContext = dbContext;
        _mapper = mapper;
        _context = context;
    }

    public async Task<Result<ArticleDto>> Handle(GetArticle query, CancellationToken cancellationToken)
    {
        var result = new Result<ArticleDto>();

        if (query.UrlIdentifier is not null && query.UrlIdentifier.Length > 300)
        {
            result.AddError("Too long url identifier");

            return result;
        }

        var isAnnonymous = !_context.Identity.IsAuthenticated;
        var isGeneralUser = _context.Identity.IsGeneralUser;
        var isAdminOrContentEditor = _context.Identity.IsAdmin || _context.Identity.IsContentEditor;

        var article = await _dbContext.Articles
            .Include(x => x.Author)
            .Include(x => x.Tags)
            .Where(x => !x.IsDeleted)
            .Where(() => isAnnonymous, x => x.Status == Status.Accepted)
            .Where(() => isGeneralUser, x => x.Status == Status.Accepted || x.AuthorId == _context.Identity.Id)
            .Where(() => isAdminOrContentEditor, x => x.Status != Status.Draft || x.AuthorId == _context.Identity.Id)
            .FirstOrDefaultAsync(x => query.Id.HasValue && x.Id == query.Id || x.Lang == query.Lang && x.Url == query.UrlIdentifier, cancellationToken);

        if (article is null)
        {
            result.AddErrorWithLogging(ErrorMessages.ArticleNotFound);
            return result;
        }

        result.SetData(_mapper.Map<ArticleDto>(article));

        return result;
    }
}
