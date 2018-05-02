using Pgs.Kanban.Domain.Dtos;
using Pgs.Kanban.Domain.Models;
using System.Linq;

namespace Pgs.Kanban.Domain.Services
{
    public class CardService
    {
        private readonly KanbanContext _context;

        public CardService()
        {
            _context = new KanbanContext();
        }

        public CardDto AddList(AddCardDto addCardDto)
        {
            if (!_context.Lists.Any(x => x.Id == addCardDto.ListId))
            {
                return null;
            }

            var card = new Card
            {
                Name = addCardDto.Name,
                ListId = addCardDto.ListId
            };

            _context.Cards.Add(card);
            _context.SaveChanges();

            var cardDto = new CardDto
            {
                Id = card.Id,
                ListId = card.ListId,
                Name = card.Name,
                
            };

            return cardDto;
        }

        public bool EditCardName(EditCardName editCardNameDto)
        {
            if (!_context.Lists.Any(x => x.Id == editCardNameDto.ListId))
            {
                return false;
            }

            var card = _context.Cards.SingleOrDefault(l => l.Id == editCardNameDto.CardId);

            if (card == null || card.Name == editCardNameDto.Name)
            {
                return false;
            }

            card.Name = editCardNameDto.Name;

            _context.Entry(card).State = Microsoft.EntityFrameworkCore.EntityState.Modified; 

            var result = _context.SaveChanges();

            return result > 0;
        }
        public bool EditCardDescriprion(EditCardDescriptionDTO editCardDescriptionDto)
        {
            if (!_context.Lists.Any(x => x.Id == editCardDescriptionDto.ListId))
            {
                return false;
            }

            var card = _context.Cards.SingleOrDefault(l => l.Id == editCardDescriptionDto.Id);

            if (card == null || (card.Description != null && card.Description == editCardDescriptionDto.Description))
            {
                return false;
            }

            card.Description = editCardDescriptionDto.Description;

            _context.Entry(card).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

            var result = _context.SaveChanges();

            return result > 0;
        }
        public bool DeleteCard(DeleteCardDto deleteCardDto)
        {

            if (!_context.Lists.Any(x => x.Id == deleteCardDto.ListId))
            {
                return false;
            }

            var card = _context.Cards.SingleOrDefault(l => l.Id == deleteCardDto.CadrId);

            if (card == null)
            {
                return false;
            }
            _context.Remove(card);
            var result = _context.SaveChanges();

            return result > 0;
        }
    }
}
