using Microsoft.AspNetCore.Mvc;
using Pgs.Kanban.Domain.Dtos;
using Pgs.Kanban.Domain.Services;

namespace Pgs.Kanban.Api.Controllers
{
    [Route("api/[controller]")]
    public class CardController: Controller
    {
        private readonly CardService _cardService;

        public CardController()
        {
            _cardService = new CardService();
        }

        [HttpPost]
        public IActionResult AddCard([FromBody] AddCardDto addCardDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = _cardService.AddList(addCardDto);

            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpPut]
        public IActionResult EditCardName([FromBody] EditCardName editCardNameDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var result = _cardService.EditCardName(editCardNameDto);

            if (!result)
            {
                return BadRequest();
            }

            return NoContent();
        }

        [HttpDelete("{id}/{listId}")]
        public IActionResult DeleteList(int id, int listId)
        {
            var deleteCardDto = new DeleteCardDto { ListId = listId, CadrId = id };
            if (deleteCardDto.ListId <= 0 && deleteCardDto.ListId <= 0)
            {
                return BadRequest();
            }

            var result = _cardService.DeleteCard(deleteCardDto);

            if (!result)
            {
                return BadRequest();
            }

            return NoContent();
        }
    }
}
