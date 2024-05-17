package cz.truchjan.unicorn.service;

import cz.truchjan.unicorn.exception.ResourceNotFoundException;
import cz.truchjan.unicorn.model.History;
import cz.truchjan.unicorn.model.Link;
import cz.truchjan.unicorn.repository.HistoryRepository;
import cz.truchjan.unicorn.repository.LinkRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class HistoryServiceImpl implements HistoryService {

	private static final String LINK_NOT_FOUND = "Link not found";

	private final LinkRepository linkRepository;
	private final HistoryRepository historyRepository;

	@Override
	public List<History> getLinksHistory(Long linkId) throws ResourceNotFoundException {
		if (!linkRepository.existsById(linkId))
			throw new ResourceNotFoundException(LINK_NOT_FOUND);
		return historyRepository.findAllByLinkId(linkId);
	}

	@Override
	public Link addHistory(Link link, Link linkUpdated) {

		List<History> newHistory = new ArrayList<>();

		if(!link.getName().equals(linkUpdated.getName())) {
			newHistory.add(new History("Name", link.getName(), linkUpdated.getName()));
		}

		if(!link.getUrl().equals(linkUpdated.getUrl())) {
			newHistory.add(new History("URL", link.getUrl(), linkUpdated.getUrl()));
		}

		if(!link.getDescription().equals(linkUpdated.getDescription())) {
			newHistory.add(new History("Description", link.getDescription(), linkUpdated.getDescription()));
		}

		if(link.isAvailableFirefox() != linkUpdated.isAvailableFirefox()) {
			newHistory.add(new History("Available in Firefox", String.valueOf(link.isAvailableFirefox()), String.valueOf(linkUpdated.isAvailableFirefox())));
		}

		if(link.isAvailableChrome() != linkUpdated.isAvailableChrome()) {
			newHistory.add(new History("Available in Chrome", String.valueOf(link.isAvailableChrome()), String.valueOf(linkUpdated.isAvailableChrome())));
		}

		if(link.isActive() != linkUpdated.isActive()) {
			newHistory.add(new History("Active", String.valueOf(link.isActive()), String.valueOf(linkUpdated.isActive())));
		}

		if(link.isNewTab() != linkUpdated.isNewTab()) {
			newHistory.add(new History("New tab", String.valueOf(link.isNewTab()), String.valueOf(linkUpdated.isNewTab())));
		}

		for(History history: newHistory) {
			history.setLink(link);
			historyRepository.save(history);
		}

		return link;
	}
}
